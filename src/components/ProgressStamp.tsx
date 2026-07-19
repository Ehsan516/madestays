import { PropertyProgress } from "@/lib/types";

const STAGE_COLOR: Record<PropertyProgress["stage"], string> = {
  live: "var(--color-brass)",
  needs_attention: "var(--color-clay)",
  in_progress: "var(--color-stone-500)",
  not_started: "var(--color-stone-300)",
};

interface ProgressStampProps {
  progress: PropertyProgress;
  size?: number;
  rotate?: boolean;
}//small presentational pieces

/**
 * The dashboard's signature element. A property's onboarding progress is rendered as a stamped seal rather than a plain progress bar,
 * to give a live property something that reads as an achievement rather than just a full percentage bar.
 */
export default function ProgressStamp({ progress, size = 64, rotate = true }: ProgressStampProps) {
  const { completedSteps, totalSteps, percentComplete, stage } = progress;
  const color = STAGE_COLOR[stage];
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentComplete / 100);

  return (
    <div
      className="relative shrink-0"
      style={{
        width: size,height: size,
        transform: rotate ? "rotate(-4deg)" : undefined,
      }}
      role="img"
      aria-label={`${completedSteps} of ${totalSteps} onboarding steps complete`}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {/* outer stamp border, double ring like a seal */}
        <circle cx="50" cy="50" r="47" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-stone-100)" strokeWidth="7" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center font-mono"
        style={{ transform: rotate ? "rotate(4deg)" : undefined }}
      >
        {stage === "live" ? (
          <span className="text-[11px] font-medium tracking-wide" style={{ color }}>
            
            LIVE
          </span>
        ) : (
          <>
            <span className="text-sm font-medium leading-none" style={{ color: "var(--color-ink)" }}>
              {completedSteps}/{totalSteps}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
