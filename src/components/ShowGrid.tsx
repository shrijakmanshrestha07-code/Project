import type { Show } from "@/types/show";
import ShowCard from "@/components/ShowCard";

type ShowGridProps = {
  shows: Show[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
};

export default function ShowGrid({ shows, favorites, onToggleFavorite }: ShowGridProps) {
  if (shows.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-white/15 px-6 py-16 text-center">
        <div className="text-4xl">🪐</div>
        <h3 className="mt-4 text-lg font-bold">No shows found</h3>
        <p className="mt-2 text-sm text-white/50">Try another search or choose a different vibe.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
      {shows.map((show) => (
        <ShowCard
          key={show.id}
          show={show}
          isFavorite={favorites.includes(show.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
