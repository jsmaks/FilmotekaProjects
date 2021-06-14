import filmotekaApiService from './getApiClass';
import movieAdapter from '../utils/movieListsAdapter';
import watchedFilmsCard from '/templates/watchedFilmsCard.hbs';
import { clearContainer } from './clearContainer';
import { appendMovieListMarkup } from './renderMoviesList';
import refs from './refs';

refs.libraryWatchedBtn.addEventListener('click', e => {
  const keyLocalStotage = 'filmWatched';
  const filmsStorage = localStorage.getItem(keyLocalStotage);
  const filmsStorageID = JSON.parse(filmsStorage);

  refs.libraryQueueBtn.classList.remove('is-active');
  refs.libraryWatchedBtn.classList.add('is-active');
  if (localStorage.getItem(keyLocalStotage)) {
    if (filmsStorageID.length === 0) {
      return (refs.filmList.innerHTML =
        '<p>Your watched library is empty 🙈</p>');
    }
    fetchMoviesID(keyLocalStotage);
  } else {
    refs.filmList.innerHTML = '<p>Your watched library is empty 🙈</p>';
  }
});
refs.libraryQueueBtn.addEventListener('click', e => {
  const keyLocalStotage = 'filmQueue';
  const filmsStorage = localStorage.getItem(keyLocalStotage);
  const filmsStorageID = JSON.parse(filmsStorage);

  refs.libraryWatchedBtn.classList.remove('is-active');
  refs.libraryQueueBtn.classList.add('is-active');
  if (localStorage.getItem(keyLocalStotage)) {
    if (filmsStorageID.length === 0) {
      return (refs.filmList.innerHTML =
        '<p>Your queue library is empty 🙈</p>');
    }
    fetchMoviesID(keyLocalStotage);
  } else {
    refs.filmList.innerHTML = '<p>Your queue library is empty 🙈</p>';
  }
});

async function fetchMoviesID(key) {
  const filmsStorage = localStorage.getItem(key);
  const filmsStorageID = JSON.parse(filmsStorage);

  const arrayFetchedFilms = await filmsStorageID.reduce(async (acc, id) => {
    const listObjects = await acc;
    const movieObject = await fetchMovie(id);

    movieObject.genres = await movieObject.genres
      .map(el => {
        return el.name;
      })
      .slice(0, 2)
      .join(', ');
    listObjects.push(movieObject);
    return listObjects;
  }, []);

  const convertedArrFilms = arrayFetchedFilms.map(el => {
    return watchedFilmsCard(movieAdapter(el));
  });

  clearContainer(refs.filmList);
  appendMovieListMarkup(convertedArrFilms);
}
async function fetchMovie(id) {
  const arrayFilms = await filmotekaApiService.fetchMovies(id).then(data => {
    return data;
  });

  return arrayFilms;
}
