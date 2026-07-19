import { FilterKey } from "@/lib/types";
import { PortfolioStats } from "@/lib/progress";

interface FilterTabsProps {
  active: FilterKey;
  onChange: (key: FilterKey) => void;
  stats: PortfolioStats;
}

export default function FilterTabs({ active, onChange, stats }: FilterTabsProps) {
  const tabs: { key: FilterKey; label: string; count: number }[] = [
    { key: "all", label: "Everything", count: stats.totalProperties },
    { key: "needs_attention", label: "Needs attention", count: stats.needsAttentionCount },
    { key: "in_progress", label: "In progress", count: stats.inProgressCount },
    { key: "not_started", label: "Not started", count: stats.notStartedCount },
    { key: "live", label: "Live", count: stats.liveCount },
  ];

  return (
    <nav aria-label="Filter properties by status" className="border-b border-stone-300/70">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <ul className="flex gap-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = tab.key === active;
            return (
              <li key={tab.key}>
                <button
                  type="button"
                  onClick={() => onChange(tab.key)}
                  aria-pressed={isActive}
                  className={`relative flex items-center gap-2 whitespace-nowrap py-4 text-sm transition-colors cursor-pointer ${
                    isActive ? "text-ink" : "text-stone-500 hover:text-ink"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`font-mono text-[11px] rounded-full px-1.5 py-0.5 ${
                      isActive ? "bg-ink text-parchment-raised" : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-px left-0 right-0 h-[2px] bg-brass" aria-hidden />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
