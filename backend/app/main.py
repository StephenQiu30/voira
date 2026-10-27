"""仅装配角色美术任务准备服务；数字人会话接口尚未接入。"""

from urllib.parse import urlsplit

from fastapi import FastAPI, Request, Response
from starlette.middleware.base import RequestResponseEndpoint
from starlette.middleware.trustedhost import TrustedHostMiddleware
from starlette.responses import JSONResponse

from app.api import character_assets

app = FastAPI(title="Voira 角色美术Agent", version="0.1.0")
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["localhost", "127.0.0.1", "[::1]"],
)


@app.middleware("http")
async def restrict_origin(
    request: Request,
    call_next: RequestResponseEndpoint,
) -> Response:
    """拒绝跨站浏览器请求；启动命令另外限制loopback绑定。"""
    origin = request.headers.get("origin")
    if origin is not None:
        try:
            parsed = urlsplit(origin)
            valid = (
                parsed.scheme in {"http", "https"}
                and parsed.hostname in {"localhost", "127.0.0.1", "::1"}
                and not parsed.username
                and not parsed.password
                and not parsed.path
                and not parsed.query
                and not parsed.fragment
                and parsed.port != 0
            )
        except ValueError:
            valid = False
        if not valid:
            return JSONResponse(
                status_code=403, content={"detail": "仅允许本机来源"}
            )
    response = await call_next(request)
    response.headers["Cache-Control"] = "no-store"
    return response


app.include_router(character_assets.router, prefix="/api")
