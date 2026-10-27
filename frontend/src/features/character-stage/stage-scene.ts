import * as THREE from "three";

/** Decorative layer only. Failure must never remove the real background or portrait. */
export function createStageScene(host: HTMLDivElement) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl2", {
    alpha: true,
    antialias: true,
  });
  if (!context) return () => {};
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      context,
      alpha: true,
      antialias: true,
    });
  } catch {
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return () => {};
  }
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 0.1, 20);
  camera.position.z = 5;
  const group = new THREE.Group();
  scene.add(group);
  const glowGeometry = new THREE.PlaneGeometry(3.1, 2.8);
  const glowMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { strength: { value: 0.12 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `varying vec2 vUv; uniform float strength;
      void main(){ vec2 p=(vUv-.5)*2.; float glow=pow(max(0.,1.-dot(p,p)),2.5);
      gl_FragColor=vec4(vec3(1.),glow*strength); }`,
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  glow.position.set(0, 0.1, -0.5);
  group.add(glow);
  const ringGeometry = new THREE.RingGeometry(0.87, 0.883, 96);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = 1.25;
  ring.position.y = -1.22;
  group.add(ring);
  const count = matchMedia("(pointer: coarse)").matches ? 10 : 20;
  const positions = new Float32Array(count * 3);
  for (let index = 0; index < count; index++) {
    const fraction = (seed: number) =>
      (Math.sin(seed * 127.1) * 43758.5453) % 1;
    positions[index * 3] = fraction(index + 1) * 1.15;
    positions[index * 3 + 1] = fraction(index + 9) * 1.35;
    positions[index * 3 + 2] = fraction(index + 19) * 0.4;
  }
  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );
  const particlesMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { strength: { value: 0.25 }, pixelRatio: { value: 1 } },
    vertexShader: `uniform float pixelRatio; void main(){ gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); gl_PointSize=3.*pixelRatio; }`,
    fragmentShader: `uniform float strength; void main(){ float d=length(gl_PointCoord-.5); gl_FragColor=vec4(vec3(1.),(1.-smoothstep(.05,.5,d))*strength); }`,
  });
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  group.add(particles);

  let visible = true;
  let disposed = false;
  let lost = false;
  let frame = 0;
  let previousTime = 0;
  let elapsed = 0;
  const target = { x: 0, y: 0 };
  const render = (time: number) => {
    frame = 0;
    if (disposed || lost || !visible || document.hidden) return;
    if (time - previousTime >= 1000 / 30) {
      elapsed += Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      group.position.x += (target.x - group.position.x) * 0.07;
      group.position.y += (target.y - group.position.y) * 0.07;
      const dark = document.documentElement.classList.contains("dark");
      glowMaterial.uniforms.strength.value = dark ? 0.045 : 0.025;
      ringMaterial.opacity = dark ? 0.065 : 0.035;
      particlesMaterial.uniforms.strength.value = dark ? 0.09 : 0.05;
      particles.rotation.y = Math.sin(elapsed * 0.12) * 0.12;
      particles.position.y = Math.sin(elapsed * 0.35) * 0.02;
      renderer.render(scene, camera);
    }
    frame = requestAnimationFrame(render);
  };
  const resume = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    if (!disposed && !lost && visible && !document.hidden) {
      previousTime = performance.now();
      frame = requestAnimationFrame(render);
      host.dataset.renderer = "webgl";
    } else if (!lost) host.dataset.renderer = "paused";
  };
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    const ratio = Math.min(devicePixelRatio, width < 450 ? 1 : 1.5);
    renderer.setPixelRatio(ratio);
    renderer.setSize(width, height, false);
    particlesMaterial.uniforms.pixelRatio.value = ratio;
    camera.left = (-1.5 * width) / height;
    camera.right = (1.5 * width) / height;
    camera.updateProjectionMatrix();
  };
  const move = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    const rect = host.getBoundingClientRect();
    target.x =
      THREE.MathUtils.clamp(
        (event.clientX - rect.left) / rect.width - 0.5,
        -0.5,
        0.5,
      ) * 0.12;
    target.y =
      THREE.MathUtils.clamp(
        0.5 - (event.clientY - rect.top) / rect.height,
        -0.5,
        0.5,
      ) * 0.06;
  };
  const leave = () => {
    target.x = 0;
    target.y = 0;
  };
  const onLost = (event: Event) => {
    event.preventDefault();
    lost = true;
    cancelAnimationFrame(frame);
    canvas.style.visibility = "hidden";
    host.dataset.renderer = "static";
  };
  const onRestored = () => {
    lost = false;
    canvas.style.visibility = "visible";
    resize();
    resume();
  };
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);
  const stage = host.parentElement!;
  stage.addEventListener("pointermove", move);
  stage.addEventListener("pointerleave", leave);
  document.addEventListener("visibilitychange", resume);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    resume();
  });
  observer.observe(host);
  host.appendChild(canvas);
  resize();
  resume();
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener("visibilitychange", resume);
    stage.removeEventListener("pointermove", move);
    stage.removeEventListener("pointerleave", leave);
    canvas.removeEventListener("webglcontextlost", onLost);
    canvas.removeEventListener("webglcontextrestored", onRestored);
    glowGeometry.dispose();
    glowMaterial.dispose();
    ringGeometry.dispose();
    ringMaterial.dispose();
    particlesGeometry.dispose();
    particlesMaterial.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
    host.dataset.renderer = "static";
  };
}
