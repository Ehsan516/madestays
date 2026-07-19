"use client";

import { useEffect, useState } from "react";
import { PropertyProgress, OnboardingStepDefinition } from "@/lib/types";
import { resolveSteps } from "@/lib/progress";
import { getStatusMeta } from "@/lib/status";
import StatusBadge from "./StatusBadge";
import ProgressStamp from "./ProgressStamp";

interface PropertyDetailPanelProps {
  progress: PropertyProgress;
  definitions: OnboardingStepDefinition[];
  onClose: () => void;
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(value: string): string | null {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return dateFormatter.format(d);
}

export default function PropertyDetailPanel({ progress, definitions, onClose }: PropertyDetailPanelProps) {
  const { property } = progress;
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = Boolean(property.image) && !imageFailed;
  const steps = resolveSteps(property, definitions);
  const goLive = formatDate(property.targetGoLiveDate);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        aria-label="Close property detail"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-[1px] cursor-pointer"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${property.name} onboarding checklist`}
        className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto bg-parchment-raised shadow-2xl animate-fade-in"
      >
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-stone-100">
          {hasImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={property.image}
              alt={property.name}
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-stone-400">
              <span className="font-display text-2xl">No photograph yet</span>
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-parchment-raised/90 text-ink shadow cursor-pointer hover:bg-parchment-raised"
          >
            ✕
          </button>
          <div className="absolute bottom-4 left-4">
            <ProgressStamp progress={progress} size={72} />
          </div>
        </div>

        <div className="flex flex-col gap-6 p-6 sm:p-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
              {property.location}
            </p>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl leading-tight text-ink">
              {property.name}
            </h2>
            <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-stone-500">
              <div className="flex gap-1.5">
                <dt>Bedrooms</dt>
                <dd className="font-mono text-ink">{property.bedrooms}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt>Target go-live</dt>
                <dd className="font-mono text-ink">{goLive ?? "Not yet set"}</dd>
              </div>
            </dl>
          </div>

          <div className="border-t border-stone-300/70 pt-6">
            <h3 className="font-display text-lg text-ink">Onboarding checklist</h3>
            <ol className="mt-4 flex flex-col">
              {steps.map(({ definition, step }, i) => {
                const meta = getStatusMeta(step.status);
                return (
                  <li
                    key={definition.id}
                    className={`flex gap-4 py-3.5 ${
                      i !== steps.length - 1 ? "border-b border-stone-300/50" : ""
                    }`}
                  >
                    <span className="font-mono text-xs text-stone-400 pt-0.5 w-5 shrink-0">
                      {String(definition.order).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm text-ink">{definition.label}</p>
                        <span className={`shrink-0 font-mono text-sm ${meta.className}`} aria-hidden>
                          {meta.glyph}
                        </span>
                      </div>
                      <div className="mt-1">
                        <StatusBadge status={step.status} />
                      </div>
                      {step.note && (
                        <p className="mt-2 rounded-sm bg-stone-50 px-3 py-2 text-sm text-stone-700 border-l-2 border-clay/60">
                          {step.note}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
