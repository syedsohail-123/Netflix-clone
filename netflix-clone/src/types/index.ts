export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Actors?: string;
  Writer?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  imdbRating?: string;
  imdbVotes?: string;
  Released?: string;
  Rated?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
}

export interface ApiResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface MovieDetails extends Movie {
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbID: string;
}