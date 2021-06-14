import movieInfoCardTmp from '/templates/movieCardInfo.hbs';
import moviePosterTmp from '/templates/moviePoster.hbs';
import movieAdapter from '../utils/movieListsAdapter';
import refs from './refs';

async function renderMovieData(object) {
  try {
    const movieDataPoster = await moviePosterTmp(movieAdapter(object));
    const movieDataInfo = await movieInfoCardTmp(movieAdapter(object));
    appendMovieCardInfo(refs.modalPoster, movieDataPoster);
    appendMovieCardInfo(refs.modalContaier, movieDataInfo);
  } catch (error) {
    console.log(error);
  }
}
function appendMovieCardInfo(ref, results) {
  ref.insertAdjacentHTML('beforeend', results);
}

export { renderMovieData, appendMovieCardInfo };
