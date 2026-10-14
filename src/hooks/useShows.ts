import { useEffect, useState } from "react";
import type { SearchResult, Show } from "@/types/show";

type UseShowsResult = {
  shows: Show[];
  loading: boolean;
  error: string;
};

export function useShows(query: string): UseShowsResult {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadShows() {
      setLoading(true);
      setError("");

      try {
        const url = query.trim()
          ? `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query.trim())}`
          : "https://api.tvmaze.com/shows?page=0";

        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("The entertainment service is unavailable right now.");

        const data: Show[] | SearchResult[] = await response.json();
        const results = query.trim()
          ? (data as SearchResult[]).map((item) => item.show)
          : (data as Show[]);

        setShows(results.filter((show) => show && show.id && show.name));
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message || "Something went wrong. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadShows();
    return () => controller.abort();
  }, [query]);

  return { shows, loading, error };
}
