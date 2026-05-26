import { en } from "../i18n/en";
import { ta } from "../i18n/ta";
import type { Language } from "../components/LanguageSwitcher";

export function useTranslations(language: Language) {
  return language === "ta" ? ta : en;
}
