import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const briefs = {
  omnipair: {
    name: "Omnipair",
    focus: "Partner intelligence for high-trust enterprise introductions.",
    status: "Live pilot",
    cadence: "Weekly operator sync",
    image: {
      alt: "Globe mark for Omnipair partner operations",
      src: "/globe.svg",
    },
    signal: "Warm intro conversion is up 18% across priority accounts.",
    priorities: [
      "Tighten account matching around regulated market operators.",
      "Publish partner scoring notes for the next executive review.",
      "Prepare expansion playbook for the top three integration channels.",
    ],
    metrics: [
      ["Qualified partners", "42"],
      ["Active intros", "17"],
      ["Pipeline lift", "$2.4M"],
    ],
  },
  solomon: {
    name: "Solomon",
    focus: "Decision support for finance, compliance, and procurement teams.",
    status: "Design validation",
    cadence: "Biweekly steering review",
    image: {
      alt: "Document mark for Solomon decision workflows",
      src: "/file.svg",
    },
    signal: "Controller interviews show strongest pull for variance narration.",
    priorities: [
      "Finish approval workflow mapping with compliance stakeholders.",
      "Prototype variance explanations against sample operating ledgers.",
      "Define evidence retention requirements before implementation kickoff.",
    ],
    metrics: [
      ["Research calls", "23"],
      ["Workflow maps", "6"],
      ["Decision latency", "-31%"],
    ],
  },
  avici: {
    name: "Avici",
    focus: "Operational planning for energy, field service, and logistics crews.",
    status: "Prototype",
    cadence: "Daily field feedback",
    image: {
      alt: "Window mark for Avici operations planning",
      src: "/window.svg",
    },
    signal: "Dispatch teams are using exception views before morning standup.",
    priorities: [
      "Add route risk summaries for weather and asset constraints.",
      "Tune crew availability rules with regional operations leads.",
      "Package a tablet-first review flow for field supervisors.",
    ],
    metrics: [
      ["Open routes", "128"],
      ["Exceptions cleared", "74%"],
      ["Review time", "9 min"],
    ],
  },
  metadao: {
    name: "MetaDAO",
    focus: "Governance operations for proposal markets and treasury decisions.",
    status: "Community review",
    cadence: "Monthly governance cycle",
    image: {
      alt: "Globe mark for MetaDAO governance operations",
      src: "/globe.svg",
    },
    signal: "Proposal authors need clearer pre-vote readiness checkpoints.",
    priorities: [
      "Separate treasury proposals from protocol parameter changes.",
      "Create readiness checks for market creation and settlement windows.",
      "Summarize voter attention trends for delegates and contributors.",
    ],
    metrics: [
      ["Draft proposals", "11"],
      ["Delegate coverage", "68%"],
      ["Avg. review window", "5 days"],
    ],
  },
} as const;

type BriefSlug = keyof typeof briefs;

function isBriefSlug(slug: string): slug is BriefSlug {
  return slug in briefs;
}

export function generateStaticParams() {
  return Object.keys(briefs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isBriefSlug(slug)) {
    return {
      title: "Operational Brief",
    };
  }

  return {
    title: `${briefs[slug].name} Operational Brief`,
    description: briefs[slug].focus,
  };
}

export default async function OperationalBriefPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isBriefSlug(slug)) {
    notFound();
  }

  const brief = briefs[slug];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 sm:px-10 lg:px-12">
        <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 text-sm text-neutral-400">
          <Link className="font-medium text-neutral-100" href="/">
            Operational Briefs
          </Link>
          <div className="flex flex-wrap gap-3">
            {Object.entries(briefs).map(([briefSlug, item]) => (
              <Link
                className={`rounded-full border px-3 py-1.5 transition ${
                  briefSlug === slug
                    ? "border-emerald-300 bg-emerald-300 text-neutral-950"
                    : "border-white/15 hover:border-white/40"
                }`}
                href={`/${briefSlug}/operational-brief`}
                key={briefSlug}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <section className="flex flex-col gap-7">
            <div className="flex flex-col gap-5">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-300">
                {brief.status}
              </p>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                {brief.name} operational brief
              </h1>
              <p className="max-w-2xl text-xl leading-8 text-neutral-300">
                {brief.focus}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {brief.metrics.map(([label, value]) => (
                <div
                  className="border border-white/10 bg-white/[0.04] p-5"
                  key={label}
                >
                  <p className="text-sm text-neutral-400">{label}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <aside className="overflow-hidden border border-white/10 bg-white/[0.04]">
            <div className="relative flex aspect-[4/3] items-center justify-center bg-neutral-100 p-10">
              <Image
                alt={brief.image.alt}
                className="h-full w-full object-contain"
                height={240}
                priority
                src={brief.image.src}
                width={240}
              />
            </div>
            <div className="p-6">
              <p className="text-sm font-medium text-neutral-400">
                Current signal
              </p>
              <p className="mt-4 text-2xl font-semibold leading-9 text-white">
                {brief.signal}
              </p>
              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="text-sm text-neutral-400">Operating cadence</p>
                <p className="mt-2 text-lg font-medium text-neutral-100">
                  {brief.cadence}
                </p>
              </div>
            </div>
          </aside>
        </div>

        <section className="grid gap-4 border-t border-white/10 pt-8 lg:grid-cols-[0.35fr_0.65fr]">
          <h2 className="text-2xl font-semibold text-white">Next priorities</h2>
          <div className="grid gap-3">
            {brief.priorities.map((priority, index) => (
              <div
                className="grid grid-cols-[auto_1fr] gap-4 border border-white/10 bg-neutral-900/70 p-5"
                key={priority}
              >
                <span className="font-mono text-sm text-emerald-300">
                  0{index + 1}
                </span>
                <p className="text-lg leading-7 text-neutral-200">{priority}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
