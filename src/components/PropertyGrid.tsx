import { PropertyProgress } from "@/lib/types";
import PropertyCard from "./PropertyCard";

interface PropertyGridProps {
  items: PropertyProgress[];
  onOpen: (id: string) => void;
}

export default function PropertyGrid({ items, onOpen }: PropertyGridProps) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-6 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
      {items.map((progress) => (
        <PropertyCard key={progress.property.id} progress={progress} onOpen={() => onOpen(progress.property.id)} />
      ))}
    </div>
  );
}
