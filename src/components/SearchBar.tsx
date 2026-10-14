type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 transition focus-within:border-lilac sm:max-w-md">
      <span className="text-lg text-white/50" aria-hidden="true">⌕</span>
      <span className="sr-only">Search TV shows</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search shows, e.g. The Office..."
        className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
      />
      {value && (
        <button type="button" onClick={() => onChange("")} className="text-xs text-white/50 hover:text-white" aria-label="Clear search">
          Clear
        </button>
      )}
    </label>
  );
}
