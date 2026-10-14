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
