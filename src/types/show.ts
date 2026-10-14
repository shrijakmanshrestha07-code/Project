export type ShowImage = {
  medium: string;
  original: string;
};

export type Show = {
  id: number;
  name: string;
  summary: string | null;
  genres: string[];
  rating?: { average: number | null };
  image: ShowImage | null;
  premiered?: string | null;
  language?: string | null;
  officialSite?: string | null;
};

export type SearchResult = {
  score: number;
  show: Show;
};
export type TMDBItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type?: "movie" | "tv" | "person";
};
