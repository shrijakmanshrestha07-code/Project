export default function Header() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#" className="flex items-center gap-2" aria-label="MoodFlix home">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent text-xl text-ink">▶</span>
          <span className="text-xl font-black tracking-tight">mood<span className="text-accent">flix</span></span>
        </a>
        <a href="#discover" className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-accent hover:text-accent">
          Discover shows <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
