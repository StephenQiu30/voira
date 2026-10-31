import { notFound } from "next/navigation";
import { BasicLayout } from "@/components/layout/basic-layout";
import { CharacterStage } from "@/features/character-stage/character-stage";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale } from "@/i18n/locales";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dictionary = getDictionary(lang);
  return (
    <BasicLayout locale={lang} copy={dictionary.layout}>
      <CharacterStage
        copy={dictionary.stage}
        profiles={dictionary.characters}
      />
    </BasicLayout>
  );
}
