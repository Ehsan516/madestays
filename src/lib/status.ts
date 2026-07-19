import { StepStatus } from "./types";

export interface StatusMeta {
  label: string;
  description: string;
  glyph: string;
  className: string;
  dotClassName: string; 
}

//statuses from the brief documents, anything else falls through to UNKNOWN_STATUS below
const STATUS_META: Record<string, StatusMeta> = {
  complete: {
    label: "Complete",
    description: "Step finished and approved.",
    glyph: "✓",
    className: "text-moss",
    dotClassName: "bg-moss",
  },
  in_progress: {
    label: "In progress",
    description: "Work is underway — nothing needed from you right now.",
    glyph: "●",
    className: "text-stone-700",
    dotClassName: "bg-stone-500",
  },
  action_required: {
    label: "Needs attention",
    description: "Blocked — we need something from you to move this forward.",
    glyph: "!",
    className: "text-clay",
    dotClassName: "bg-clay",
  },
  not_started: {
    label: "Not started",
    description: "Not begun yet.",
    glyph: "○",
    className: "text-stone-400",
    dotClassName: "bg-stone-300",
  },
};

const UNKNOWN_STATUS: StatusMeta = {
  label: "On hold",
  description: "Paused — check with your account manager for the latest.",
  glyph: "⏸",
  className: "text-brass",
  dotClassName: "bg-brass",
};

export function getStatusMeta(status: StepStatus): StatusMeta {
  return STATUS_META[status] ?? UNKNOWN_STATUS;
}
