import { AttentionItem } from "@/lib/progress";

interface AttentionDigestProps {
  items: AttentionItem[];
  onSelect: (propertyId: string) => void;
}

//todo list view of the whole portfolio, every action_required step, flattened, so the owner doesnt have to open each
// card just to check if somethings wrong with it.
export default function AttentionDigest({ items, onSelect }: AttentionDigestProps) {
  if (items.length === 0) return null;

  return (
    <section className="border-b border-stone-300/70">
      <div className="mx-auto max-w-6xl px-6 py-5 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-clay">
          {items.length} {items.length === 1 ? "thing needs" : "things need"} you
        </p>
        <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
          {items.map((item, i) => (
            <li key={`${item.propertyId}-${item.stepLabel}-${i}`}>
              <button
                type="button"
                onClick={() => onSelect(item.propertyId)}
                className="group flex w-full items-baseline gap-1.5 text-left text-sm cursor-pointer"
              >
                <span className="text-ink group-hover:text-clay transition-colors">
                  {item.propertyName}
                </span>
                <span className="text-stone-400">—</span>
                <span className="text-stone-500">{item.stepLabel}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
