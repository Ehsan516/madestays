"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchOnboardingData } from "@/lib/fetchOnboardingData";
import { computeAllProgress, computePortfolioStats } from "@/lib/progress";
import { FilterKey, OnboardingData } from "@/lib/types";
import PortfolioSummary from "./PortfolioSummary";
import FilterTabs from "./FilterTabs";
import PropertyGrid from "./PropertyGrid";
import PropertyDetailPanel from "./PropertyDetailPanel";
import EmptyState from "./EmptyState";
import { LoadingGrid, LoadingHeader } from "./LoadingState";

const FILTER_LABELS: Record<FilterKey, string> = {
  all: "everything",
  needs_attention: "needs attention",
  in_progress: "in progress",
  live: "live",
  not_started: "not started",
};

export default function Dashboard() {
  const [data, setData] = useState<OnboardingData | null>(null);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchOnboardingData().then((result) => {
      if (!cancelled) setData(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const allProgress = useMemo(() => (data ? computeAllProgress(data) : []), [data]);
  const stats = useMemo(() => computePortfolioStats(allProgress), [allProgress]);
  const filtered = useMemo(
    () => (filter === "all" ? allProgress : allProgress.filter((p) => p.stage === filter)),
    [allProgress, filter]
  );
  const selected = useMemo(
    () => allProgress.find((p) => p.property.id === selectedId) ?? null,
    [allProgress, selectedId]
  );

  if (!data) {
    return (
      <main className="flex-1">
        <LoadingHeader />
        <LoadingGrid />
      </main>
    );
  }

  return (
    <main className="flex-1">
      <PortfolioSummary owner={data.owner} stats={stats} accountManager={data.owner.accountManager} />
      <FilterTabs active={filter} onChange={setFilter} stats={stats} />

      {filtered.length === 0 ? (
        <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
          <EmptyState filterLabel={FILTER_LABELS[filter]} onReset={() => setFilter("all")} />
        </div>
      ) : (
        <PropertyGrid items={filtered} onOpen={setSelectedId} />
      )}

      {selected && (
        <PropertyDetailPanel
          progress={selected}
          definitions={data.onboardingStepDefinitions}
          onClose={() => setSelectedId(null)}
        />
      )}
    </main>
  );
}
