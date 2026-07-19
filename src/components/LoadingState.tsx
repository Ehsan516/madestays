export function LoadingHeader() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-6 pt-10 pb-8 sm:px-8">
      <div className="h-3 w-40 rounded-full bg-stone-100" />
      <div className="mt-4 h-9 w-72 rounded-sm bg-stone-100" />
      <div className="mt-3 h-4 w-96 max-w-full rounded-sm bg-stone-100" />
    </div>
  );
}

export function LoadingGrid() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-6 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-sm border border-stone-300/70">
          <div className="aspect-[4/3] w-full bg-stone-100" />
          <div className="flex flex-col gap-2 p-4">
            <div className="h-4 w-3/4 rounded-sm bg-stone-100" />
            <div className="h-3 w-1/2 rounded-sm bg-stone-100" />
            <div className="mt-3 h-3 w-1/3 rounded-sm bg-stone-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
