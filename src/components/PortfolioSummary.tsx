import { Owner, OnboardingData } from "@/lib/types";
import { PortfolioStats } from "@/lib/progress";

interface PortfolioSummaryProps {
  owner: Owner;
  stats: PortfolioStats;
  accountManager: OnboardingData["owner"]["accountManager"];
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-mono text-2xl sm:text-3xl text-ink leading-none">{value}</span>
      <span className="mt-1.5 text-[11px] uppercase tracking-wide text-stone-500">{label}</span>
    </div>
  );
}

export default function PortfolioSummary({ owner, stats, accountManager }: PortfolioSummaryProps) {
  const firstName = owner.name.split(" ")[0];

  return (
    <header className="border-b border-stone-300/70">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-8 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
          Madestays · Owner Dossier
        </p>
        <div className="mt-3 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl text-ink">
              {firstName}&rsquo;s portfolio
            </h1>
            <p className="mt-2 text-sm text-stone-500">
              Managed by {accountManager}. Every property below moves through the same
              ten-step checklist before it goes live.
            </p>
          </div>
          <dl className="flex gap-8 sm:gap-10 border-t sm:border-t-0 pt-5 sm:pt-0 border-stone-300/70">
            <Stat value={String(stats.totalProperties)} label="Properties" />
            <Stat value={`${stats.liveCount}/${stats.totalProperties}`} label="Live" />
            <Stat value={`${stats.overallPercentComplete}%`} label="Onboarded" />
          </dl>
        </div>
      </div>
    </header>
  );
}
