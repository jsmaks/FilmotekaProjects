import Pagination from 'tui-pagination';
import refs from './refs';
import filmotekaApiService from './getApiClass';
import { clearContainer } from './clearContainer';
import { genresIdConverter } from '../utils/genreConverter';
import { renderMovieList } from './renderMoviesList';

const options = {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination(refs.paginationRef, options);

refs.paginationRef.addEventListener('click', event => {
  isEnabled(event);
});

function isEnabled(event) {
  const arr = Array.from(event.target.classList);
  if (!arr.includes('tui-pagination')) {
    setPaginator(event);
  }
}

async function setPaginator(event) {
  let text = event.target.textContent;
  let page = filmotekaApiService.page;
  let lastPage = options.totalItems / options.itemsPerPage;
  const activeBtnRef = document.querySelector('.tui-is-selected');

  if (event.target.classList[1] === 'tui-next') {
    page += 1;
  } else if (event.target.classList[1] === 'tui-prev') {
    page -= 1;
  } else if (text === 'first') {
    page = 1;
  } else if (text === 'last') {
    page = lastPage;
  } else if (text === '...') {
    page = Number(activeBtnRef.textContent);
  } else {
    page = Number(text);
  }

  if (page && page !== lastPage) {
    filmotekaApiService.page = page;

    if (!refs.inputValue.value) {
      try {
        const popularList = await filmotekaApiService.fetchResults();
        const { results } = popularList;
        await results.map(el => genresIdConverter(el));
        clearContainer(refs.filmList);
        renderMovieList(popularList);
        scrollElements();
        return;
      } catch (error) {
        console.log(error);
      }
    }

    const searchList = await filmotekaApiService.fetchSearch();
    const { results } = searchList;
    results.map(el => genresIdConverter(el));
    clearContainer(refs.filmList);
    renderMovieList(searchList);
    scrollElements();
  }
}

function scrollElements() {
  window.scrollTo({
    top: 0,
  });
}

export { pagination };
