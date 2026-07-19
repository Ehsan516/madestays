import { getStatusMeta } from "@/lib/status";
import { StepStatus } from "@/lib/types";

export default function StatusBadge({ status }: { status: StepStatus }) {
  const meta = getStatusMeta(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide uppercase ${meta.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dotClassName}`} aria-hidden />
      {meta.label}
    </span>
  );
}
