import refs from './refs';
import movieAdapter from '../utils/movieListsAdapter';
import movieCardTmp from '/templates/movieCard.hbs';

async function renderMovieList(object) {
  try {
    const { results } = object;
    const movieList = await results.map(item =>
      movieCardTmp(movieAdapter(item)),
    );
    appendMovieListMarkup(movieList);
  } catch (error) {
    console.log(error);
  }
}

function appendMovieListMarkup(results) {
  refs.filmList.insertAdjacentHTML('beforeend', results.join(''));
}
export { renderMovieList, appendMovieListMarkup };
