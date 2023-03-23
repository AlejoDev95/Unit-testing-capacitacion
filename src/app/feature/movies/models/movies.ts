export interface Movie {
  id: string;
  category: string;
  description: string;
  image: string;
  releaseDate: string;
  title: string;
}

export type CreateMovieDTO = Omit<Movie, 'id'>;

export type UpdateMovieDTO = Partial<Movie>;
