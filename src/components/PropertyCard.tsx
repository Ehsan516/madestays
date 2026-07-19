"use client";

import { useState } from "react";
import { PropertyProgress } from "@/lib/types";
import ProgressStamp from "./ProgressStamp";

interface PropertyCardProps {
  progress: PropertyProgress;
  onOpen: () => void;
}

const STAGE_LABEL: Record<PropertyProgress["stage"], string> = {
  live: "Live",
  needs_attention: "Needs your attention",
  in_progress: "In progress",
  not_started: "Not started",
};

export default function PropertyCard({ progress, onOpen }: PropertyCardProps) {
  const { property, actionRequiredSteps, stage } = progress;
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = Boolean(property.image) && !imageFailed;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group text-left flex flex-col overflow-hidden rounded-sm bg-parchment-raised border border-stone-300/70 transition-all hover:border-brass/70 hover:shadow-[0_4px_24px_-8px_rgba(28,36,48,0.25)] cursor-pointer"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={property.image}
            alt={property.name}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-stone-400">
            <span className="font-display text-2xl">No photograph yet</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <ProgressStamp progress={progress} size={56} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <h3 className="font-display text-lg leading-snug text-ink line-clamp-2">{property.name}</h3>
          <p className="mt-0.5 text-sm text-stone-500">{property.location}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-[11px] font-medium uppercase tracking-wide">
            <StageLabel stage={stage} />
          </span>
          {actionRequiredSteps.length > 0 && (
            <span className="font-mono text-[11px] text-clay">
              {actionRequiredSteps.length} open item{actionRequiredSteps.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function StageLabel({ stage }: { stage: PropertyProgress["stage"] }) {
  const colorClass =
    stage === "live"
      ? "text-brass"
      : stage === "needs_attention"
      ? "text-clay"
      : stage === "in_progress"
      ? "text-stone-700"
      : "text-stone-400";
  return (
    <span className={`inline-flex items-center gap-1.5 ${colorClass}`}>
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          stage === "live"
            ? "bg-brass"
            : stage === "needs_attention"
            ? "bg-clay"
            : stage === "in_progress"
            ? "bg-stone-500"
            : "bg-stone-300"
        }`}
        aria-hidden
      />
      {STAGE_LABEL[stage]}
    </span>
  );
}
