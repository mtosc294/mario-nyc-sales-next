import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

type Messages = Record<string, unknown>;

function mergeMessages(base: Messages, overlay: Messages): Messages {
  const result: Messages = { ...base };
  for (const [key, value] of Object.entries(overlay)) {
    const existing = result[key];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      existing &&
      typeof existing === "object" &&
      !Array.isArray(existing)
    ) {
      result[key] = mergeMessages(existing as Messages, value as Messages);
    } else {
      result[key] = value;
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const enMessages = (await import("../../messages/en.json")).default as Messages;
  const localeMessages =
    locale === "en"
      ? enMessages
      : ((await import(`../../messages/${locale}.json`)).default as Messages);

  return {
    locale,
    messages: locale === "en" ? enMessages : mergeMessages(enMessages, localeMessages),
  };
});
