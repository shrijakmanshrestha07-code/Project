import type { Show } from "@/types/show";

type ShowCardProps = {
  show: Show;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
};

function plainText(summary: string | null | undefined): string {
  return (summary ?? "No description is available for this show.")
    .replace(/<[^>]*>/g, "")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"');
}

export default function ShowCard({ show, isFavorite, onToggleFavorite }: ShowCardProps) {
  const rating = show.rating?.average;

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-panel transition duration-300 hover:-translate-y-1 hover:border-lilac/40 hover:shadow-glow">
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-lilac/20 to-accent/10">
        {show.image?.medium ? (
          // TVmaze supplies poster URLs dynamically.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={show.image.medium} alt={`${show.name} poster`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="grid h-full place-items-center p-5 text-center">
            <span className="text-5xl" aria-hidden="true">🎬</span>
            <span className="mt-3 font-bold">{show.name}</span>
          </div>
        )}
        <button
          type="button"
          onClick={() => onToggleFavorite(show.id)}
          aria-label={isFavorite ? `Remove ${show.name} from favorites` : `Add ${show.name} to favorites`}
          aria-pressed={isFavorite}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/60 text-xl backdrop-blur transition hover:scale-105"
        >
          <span className={isFavorite ? "text-rose-400" : "text-white"}>{isFavorite ? "♥" : "♡"}</span>
        </button>
        {typeof rating === "number" && (
          <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-accent backdrop-blur">
            ★ {rating.toFixed(1)}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-bold text-white" title={show.name}>{show.name}</h3>
          <span className="shrink-0 text-xs text-white/40">{show.premiered?.slice(0, 4) || "—"}</span>
        </div>
        <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-sm leading-5 text-white/55">{plainText(show.summary)}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {(show.genres ?? []).slice(0, 2).map((genre) => (
            <span key={genre} className="rounded-md bg-white/[0.07] px-2 py-1 text-[11px] font-medium text-white/60">{genre}</span>
          ))}
          {(!show.genres || show.genres.length === 0) && <span className="text-xs text-white/40">Genre not listed</span>}
        </div>
        {show.officialSite && (
          <a href={show.officialSite} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-bold text-accent hover:underline">
            Official website ↗
          </a>
        )}
      </div>
    </article>
  );
}
