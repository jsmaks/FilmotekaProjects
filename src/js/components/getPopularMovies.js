import refs from './refs';
import { clearContainer } from './clearContainer';
import { genresIdConverter } from '../utils/genreConverter';
import { renderMovieList } from './renderMoviesList';
import filmotekaApiService from './getApiClass';
import { pagination } from './paginationPages';

async function PopularMovie() {
  try {
    clearContainer(refs.filmList);

    const moviesList = await filmotekaApiService.fetchResults();
    const { results } = moviesList;

    results.map(el => genresIdConverter(el));
    renderMovieList(moviesList);
    pagination.reset(moviesList.total_results);
    filmotekaApiService.resetPage();
  } catch (error) {
    console.log(error);
  }
}
PopularMovie();
export { PopularMovie };
