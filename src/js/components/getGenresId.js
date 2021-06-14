import { renderMovieData } from './renderCardInfo';
import filmotekaApiService from './getApiClass';

async function getMovie(id) {
  const movieInfo = await filmotekaApiService.fetchMovies(id);

  //Жанр конвертер для карточки
  movieInfo.genres = await movieInfo.genres
    .map(el => {
      return el.name;
    })
    .slice(0, 2)
    .join(', ');


  await renderMovieData(movieInfo);
}
export { getMovie };
