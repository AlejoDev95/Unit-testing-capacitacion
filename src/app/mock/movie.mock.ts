import { faker } from '@faker-js/faker';
import { Movie } from '../feature/movies/models/movies';

export const generateOneMovie = (): Movie => ({
  id: faker.datatype.uuid(),
  category: faker.random.word(),
  description: faker.random.words(),
  image: faker.image.imageUrl(),
  releaseDate: faker.date.future(10).toDateString(),
  title: faker.random.word(),
});

export const generateManyMovies = (size = 5): Movie[] =>
  Array.from({ length: size }, () => generateOneMovie());
