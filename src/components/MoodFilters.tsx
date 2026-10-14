export const MOODS = ["All", "Comedy", "Drama", "Science-Fiction", "Romance", "Action"] as const;
export type Mood = (typeof MOODS)[number];

type MoodFiltersProps = {
  activeMood: Mood;
  onChange: (mood: Mood) => void;
};

export default function MoodFilters({ activeMood, onChange }: MoodFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Filter by genre">
      {MOODS.map((mood) => (
        <button
          key={mood}
          type="button"
          onClick={() => onChange(mood)}
          aria-pressed={activeMood === mood}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            activeMood === mood
              ? "bg-accent text-ink"
              : "border border-white/10 bg-white/[0.04] text-white/65 hover:border-white/30 hover:text-white"
          }`}
        >
          {mood === "All" ? "✨ All vibes" : mood}
        </button>
      ))}
    </div>
  );
}
