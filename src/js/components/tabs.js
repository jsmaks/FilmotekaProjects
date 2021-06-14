import refs from './refs';
import { PopularMovie } from './getPopularMovies';
import filmotekaApiService from './getApiClass';

refs.homeButton.addEventListener('click', onHomeButton);
refs.libraryButton.addEventListener('click', onLibraryButton);

function onHomeButton() {
  if (refs.header.id === 'home') {
    refs.inputValue.value = '';
    filmotekaApiService.resetPage();
    PopularMovie();
    return;
  }
  refs.header.id = 'home';
  refs.inputValue.value = '';
  toggleActiveLink();
  toggleLibraryBg();
  toggleLibraryTab();
  toggleHomeTab();
  refs.paginationRef.classList.remove('invisible');
  filmotekaApiService.resetPage();
  PopularMovie();
}

function onLibraryButton() {
  if (refs.header.id === 'library') return;
  refs.header.id = 'library';
  toggleActiveLink();
  toggleLibraryBg();
  toggleHomeTab();
  toggleLibraryTab();
  refs.paginationRef.classList.add('invisible');
  refs.libraryWatchedBtn.classList.remove('is-active');
  refs.libraryQueueBtn.classList.remove('is-active');
  refs.filmList.innerHTML =
    '<p>Select at the top what you want to display: viewed or queued ☝🏻</p>';
}
///////////////////////////////////////////////////////////
function toggleHomeTab() {
  refs.searchContainer.classList.toggle('tab-active');
  refs.searchContainer.classList.toggle('tab-inactive');
}
function toggleLibraryTab() {
  refs.libraryContainer.classList.toggle('tab-active');
  refs.libraryContainer.classList.toggle('tab-inactive');
}
function toggleLibraryBg() {
  refs.header.classList.toggle('library');
}
function toggleActiveLink() {
  refs.activeLink.firstElementChild.classList.toggle('active');
  refs.activeLink.lastElementChild.classList.toggle('active');
}
