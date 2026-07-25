import { locales, type AppLocale } from "@/i18n/routing";

export type { AppLocale };

export const languageOptions: {
  code: AppLocale;
  labelKey: "en" | "es" | "zh" | "it";
  flag: string;
}[] = [
  { code: "en", labelKey: "en", flag: "🇺🇸" },
  { code: "es", labelKey: "es", flag: "🇪🇸" },
  { code: "zh", labelKey: "zh", flag: "🇨🇳" },
  { code: "it", labelKey: "it", flag: "🇮🇹" },
];

export function isAppLocale(value: string): value is AppLocale {
  return (locales as readonly string[]).includes(value);
}
