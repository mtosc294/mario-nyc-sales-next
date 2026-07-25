import Image from "next/image";
import { ArrowRight, BarChart3, Check, CircleDollarSign, MapPin } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SearchHero } from "@/components/search-hero";
import { LeadForm } from "@/components/lead-form";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { guides, neighborhoods } from "@/lib/site-data";

const processSteps = [
  ["Share your goal", "Buying, selling, or investing—and your timeline."],
  ["Review the details", "Your property, preferences, budget, and constraints."],
  ["Read the market", "Comps, competition, demand, and neighborhood context."],
  ["Get a clear recommendation", "Pricing, timing, and the options that fit your situation."],
  ["Agree on one next step", "A pricing call, tour plan, or launch checklist—not a pile of homework."],
  ["Stay guided to closing", "Support from first conversation through contracts and keys."],
] as const;

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const featuredHoods = neighborhoods.slice(0, 4);
  const pathCards = [
    { title: t("pathSellTitle"), text: t("pathSellText"), href: "/sell" as const, icon: "⌂" },
    { title: t("pathBuyTitle"), text: t("pathBuyText"), href: "/buy" as const, icon: "✓" },
    { title: t("pathInvestTitle"), text: t("pathInvestText"), href: "/invest" as const, icon: "↗" },
  ];

  return (
    <main className="bg-[var(--paper)]">
      <SearchHero />

      <section className="border-b border-[var(--line)] bg-white px-5 py-12 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[var(--platinum)]">{t("howToStart")}</p>
            <p className="mt-4 text-lg leading-8 text-neutral-700">{t("howToStartBody")}</p>
          </div>
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--navy-soft)] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[var(--navy)]">{t("directAnswer")}</p>
            <p className="mt-4 text-lg leading-8 text-[var(--ink)]">{t("directAnswerBody")}</p>
          </div>
        </div>
      </section>

      <section className="py-[95px] max-[900px]:py-[70px]">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))] max-sm:w-[min(100%-28px,1180px)]">
          <Reveal className="grid items-end gap-[60px] max-[900px]:grid-cols-1 md:grid-cols-[1fr_.68fr]">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--platinum)]">{t("choosePath")}</span>
              <h2 className="mt-3.5 text-5xl font-semibold leading-[1.03] tracking-[-0.045em] max-[600px]:text-[37px]">
                {t("choosePathTitle")}
              </h2>
            </div>
            <p className="leading-7 text-neutral-600">{t("choosePathBody")}</p>
          </Reveal>
          <Stagger className="mt-11 grid gap-[18px] md:grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
            {pathCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="min-h-[275px] rounded-[26px] border border-[var(--line)] bg-white p-7 transition hover:-translate-y-1 hover:border-[var(--navy)]"
              >
                <span className="text-[31px] text-[var(--navy)]">{card.icon}</span>
                <h3 className="mt-12 text-[25px] font-semibold">{card.title}</h3>
                <p className="mt-3 leading-[1.65] text-neutral-600">{card.text}</p>
                <b className="mt-6 inline-block">{t("startHere")}</b>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-[var(--navy)] py-[95px] text-white max-[900px]:py-[70px]">
        <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] gap-[70px] max-[900px]:grid-cols-1 lg:grid-cols-[.75fr_1.25fr] max-sm:w-[min(100%-28px,1180px)]">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--platinum)]">
              {t("howWeWork")}
            </span>
            <h2 className="mt-3.5 text-5xl font-semibold leading-[1.03] tracking-[-0.045em] max-[600px]:text-[37px]">
              {t("howWeWorkTitle")}
            </h2>
            <p className="mt-4 leading-7 text-white/60">{t("howWeWorkBody")}</p>
          </Reveal>
          <Stagger className="grid gap-3 sm:grid-cols-2">
            {processSteps.map(([title, text], index) => (
              <div key={title} className="rounded-[18px] border border-white/10 bg-white/5 p-5">
                <small className="text-[var(--platinum)]">0{index + 1}</small>
                <b className="mt-3 mb-2 block">{title}</b>
                <p className="text-sm leading-6 text-white/55">{text}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="neighborhoods" className="py-[95px] max-[900px]:py-[70px]">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))] max-sm:w-[min(100%-28px,1180px)]">
          <Reveal className="grid items-end gap-[60px] max-[900px]:grid-cols-1 md:grid-cols-[1fr_.68fr]">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--platinum)]">
                {t("neighborhoods")}
              </span>
              <h2 className="mt-3.5 text-5xl font-semibold leading-[1.03] tracking-[-0.045em] max-[600px]:text-[37px]">
                {t("neighborhoodsTitle")}
              </h2>
            </div>
            <p className="leading-7 text-neutral-600">{t("neighborhoodsBody")}</p>
          </Reveal>
          <Stagger className="mt-[42px] grid gap-[17px] sm:grid-cols-2 lg:grid-cols-4 max-[600px]:grid-cols-1">
            {featuredHoods.map((hood) => (
              <Link
                key={hood.slug}
                href={`/neighborhoods/${hood.slug}`}
                className="group overflow-hidden rounded-[25px] border border-[var(--line)] bg-white transition hover:-translate-y-0.5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={hood.image}
                    alt={hood.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <small className="text-xs uppercase tracking-[0.16em] text-[var(--platinum)]">{hood.borough}</small>
                  <h3 className="mt-1.5 text-xl font-semibold">{hood.name}</h3>
                  <p className="mt-2 text-sm leading-[1.55] text-neutral-600">{hood.summary}</p>
                </div>
              </Link>
            ))}
          </Stagger>
          <div className="mt-8">
            <Link href="/neighborhoods" className="inline-flex items-center gap-2 text-sm font-semibold">
              {t("viewAll")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--navy-soft)] py-[95px] max-[900px]:py-[70px]">
        <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-[50px] max-[900px]:grid-cols-1 lg:grid-cols-2 max-sm:w-[min(100%-28px,1180px)]">
          <Reveal className="relative overflow-hidden rounded-[31px] bg-[var(--navy)] p-[38px] text-white">
            <div className="pointer-events-none absolute -right-[50px] -top-[50px] size-[220px] rounded-full bg-white/5 blur-[35px]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--platinum)]">For sellers</span>
            <h2 className="relative mt-3.5 text-[45px] font-semibold leading-[1.03] tracking-[-0.04em] max-[600px]:text-[37px]">
              What could your NYC property sell for?
            </h2>
            <p className="relative mt-4 leading-7 text-white/60">
              A real valuation looks at recent sales, current competition, monthly costs, building health, condition,
              floor, light, view, and who’s buying now.
            </p>
            <Link
              href="/#strategy"
              className="relative mt-5 inline-block rounded-full bg-white px-5 py-3.5 text-sm font-extrabold text-[var(--navy)] transition hover:-translate-y-0.5"
            >
              Get a personalized valuation →
            </Link>
          </Reveal>
          <Stagger className="grid gap-[13px] sm:grid-cols-2">
            {[
              { icon: BarChart3, title: "Comparable sales", text: "Recent, relevant, and adjusted—not a ZIP-code average." },
              {
                icon: CircleDollarSign,
                title: "Carrying costs",
                text: "Taxes, common charges, and assessments that affect what buyers will pay.",
              },
              {
                icon: MapPin,
                title: "What’s on the market",
                text: "Active listings that shape attention, timing, and leverage.",
              },
              {
                icon: Check,
                title: "Launch readiness",
                text: "Preparation, photos, timing, and documents before you go live.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-[18px] border border-[var(--line)] bg-white p-5">
                <Icon className="size-5 text-[var(--navy)]" />
                <h3 className="mt-3 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-[1.6] text-neutral-600">{text}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="guides" className="py-[95px] max-[900px]:py-[70px]">
        <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] gap-10 max-[900px]:grid-cols-1 lg:grid-cols-[.65fr_1.35fr] max-sm:w-[min(100%-28px,1180px)]">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--platinum)]">{t("guides")}</span>
            <h2 className="mt-3.5 text-5xl font-semibold leading-[1.03] tracking-[-0.045em] max-[600px]:text-[37px]">
              {t("guidesTitle")}
            </h2>
            <p className="mt-4 leading-7 text-neutral-600">
              Each guide opens with a clear answer, then adds NYC-specific steps and a next action you can take.
            </p>
          </Reveal>
          <Stagger className="grid gap-4">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group flex items-center justify-between gap-5 rounded-2xl border border-[var(--line)] bg-white p-6 transition hover:border-[var(--navy)]"
              >
                <div>
                  <h3 className="text-xl font-semibold">{guide.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{guide.excerpt}</p>
                </div>
                <ArrowRight className="size-5 shrink-0 transition group-hover:translate-x-1" />
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="strategy" className="bg-[color-mix(in_srgb,var(--platinum)_18%,white)] py-[95px] max-[900px]:py-[70px]">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))] max-sm:w-[min(100%-28px,1180px)]">
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
