"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import MoodFilters, { type Mood } from "@/components/MoodFilters";
import ShowGrid from "@/components/ShowGrid";
import { useShows } from "@/hooks/useShows";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [activeMood, setActiveMood] = useState<Mood>("All");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { shows, loading, error } = useShows(query);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("moodflix-favorites");
      if (saved) setFavorites(JSON.parse(saved) as number[]);
    } catch {
      // Ignore invalid or unavailable browser storage.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("moodflix-favorites", JSON.stringify(favorites));
    } catch {
      // Favorites still work in memory if browser storage is unavailable.
    }
  }, [favorites]);

  const filteredShows = useMemo(() => {
    return shows.filter((show) => {
      const matchesMood = activeMood === "All" || show.genres?.some(
        (genre) => genre.toLowerCase() === activeMood.toLowerCase()
      );
      const matchesFavorites = !showFavoritesOnly || favorites.includes(show.id);
      return matchesMood && matchesFavorites;
    });
  }, [shows, activeMood, favorites, showFavoritesOnly]);

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id]
    );
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-lilac/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-accent/10 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.08] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Your next obsession starts here
            </span>
            <h1 className="mt-6 text-5xl font-black leading-[1.02] tracking-tight sm:text-7xl">
              What are we <span className="bg-gradient-to-r from-lilac to-accent bg-clip-text text-transparent">feeling</span> tonight?
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/55 sm:text-lg">
              Find your next comfort show, laugh-out-loud comedy, or late-night sci-fi adventure. One mood, endless stories.
            </p>
          </div>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <SearchBar value={query} onChange={setQuery} />
            <button
              type="button"
              onClick={() => setShowFavoritesOnly((value) => !value)}
              aria-pressed={showFavoritesOnly}
              className={`rounded-2xl px-5 py-3.5 text-sm font-bold transition ${
                showFavoritesOnly ? "bg-lilac text-ink" : "border border-white/10 bg-white/[0.05] text-white/75 hover:bg-white/10"
              }`}
            >
              ♥ {showFavoritesOnly ? "Showing favorites" : `My favorites (${favorites.length})`}
            </button>
          </div>
        </div>
      </section>

      <section id="discover" className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-lilac">Curated for your vibe</p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              {showFavoritesOnly ? "Your watchlist" : query ? "Search results" : "Explore the universe"}
            </h2>
          </div>
          <p className="text-sm text-white/45">
            {loading ? "Finding your next favorite…" : `${filteredShows.length} ${filteredShows.length === 1 ? "show" : "shows"} to explore`}
          </p>
        </div>

        <div className="mb-8">
          <MoodFilters activeMood={activeMood} onChange={setActiveMood} />
        </div>

        {error ? (
          <div role="alert" className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-6 text-rose-200">
            <p className="font-bold">We couldn&apos;t load the shows.</p>
            <p className="mt-1 text-sm">{error}</p>
            <button onClick={() => setQuery((value) => value)} className="mt-3 text-sm font-bold underline">Try again by changing your search</button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[4/5] rounded-3xl bg-white/[0.07]" />
                <div className="mt-3 h-4 w-3/4 rounded bg-white/[0.07]" />
                <div className="mt-2 h-3 w-1/2 rounded bg-white/[0.05]" />
              </div>
            ))}
          </div>
        ) : (
          <ShowGrid shows={filteredShows} favorites={favorites} onToggleFavorite={toggleFavorite} />
        )}
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} MoodFlix. Made for people who love a good story.</p>
          <p>Show data provided by TVmaze · For educational use</p>
        </div>
      </footer>
    </main>
  );
}
