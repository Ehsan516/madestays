interface EmptyStateProps {
  filterLabel: string;
  onReset: () => void;
}

export default function EmptyState({ filterLabel, onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-stone-300 py-20 text-center">
      <span className="font-display text-2xl text-ink">Nothing here right now</span>
      <p className="max-w-sm text-sm text-stone-500">
        No properties are currently &ldquo;{filterLabel}.&rdquo; Try another view, or come back once
        something changes.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 text-sm font-medium text-brass underline underline-offset-4 cursor-pointer hover:text-ink"
      >
        Show everything
      </button>
    </div>
  );
}
