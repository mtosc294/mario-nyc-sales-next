import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { advisorSubtitle, licenseLabel, siteConfig } from "@/lib/site-config";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const license = licenseLabel();
  return (
    <footer className="bg-[var(--navy)] px-5 py-14 text-[var(--platinum)]">
      <div className="mx-auto flex w-[min(1180px,calc(100%-40px))] flex-col gap-8 max-sm:w-[min(100%-28px,1180px)] md:flex-row md:items-start md:justify-between">
        <div>
          <strong className="text-white">{siteConfig.name}</strong>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--platinum)]">{t("tagline")}</p>
          <p className="mt-2 max-w-sm text-xs leading-5 text-white/50">{advisorSubtitle()}</p>
          {license && <p className="mt-1 text-xs text-white/50">{license}</p>}
          <p className="mt-4 grid gap-1 text-sm">
            <a href={siteConfig.phoneHref} className="transition hover:text-white">
              {siteConfig.phone}
            </a>
            <a href={siteConfig.emailHref} className="transition hover:text-white">
              {siteConfig.email}
            </a>
          </p>
        </div>
        <div className="grid gap-3 text-sm">
          <Link href="/neighborhoods" className="transition hover:text-white">
            {t("neighborhoods")}
          </Link>
          <Link href="/#guides" className="transition hover:text-white">
            {t("guides")}
          </Link>
          <Link href="/sell" className="transition hover:text-white">
            {t("sell")}
          </Link>
          <Link href="/buy" className="transition hover:text-white">
            {t("buy")}
          </Link>
          <Link href="/invest" className="transition hover:text-white">
            {t("invest")}
          </Link>
          <Link href="/#strategy" className="transition hover:text-white">
            {t("bookConsult")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
