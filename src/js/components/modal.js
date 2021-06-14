import refs from './refs';
import { getMovie } from './getGenresId';
import { clearContainer } from './clearContainer';
import { addsToLibrary } from './addsToLibrary';

refs.closeBtn.addEventListener('click', closeModal);
refs.lightBox.addEventListener('click', closeModalOnBackdrop);
refs.onMovieClick.addEventListener('click', showModal);

async function showModal(event) {
  event.preventDefault();

  const target = event.target.parentNode;
  if (target.parentNode.nodeName !== 'A') return;

  refs.body.style.paddingRight =
    window.innerWidth - refs.body.clientWidth + 'px';
  if (refs.lightBox.firstElementChild.clientHeight + 40 > window.innerHeight) {
    refs.lightBox.firstElementChild.style.left = '0px';
  } else {
    refs.lightBox.firstElementChild.style.left =
      (refs.body.clientWidth - window.innerWidth) / 2 + 'px';
  }

  refs.body.lastElementChild.style.visibility = 'hidden';
  refs.body.classList.add('no-scroll');
  refs.modal.classList.remove('is-hidden');

  window.addEventListener('keydown', closeModalOnEsc);

  try {
    const idMovie = target.parentNode.dataset.id;
    await getMovie(idMovie);
    addsToLibrary(idMovie);
  } catch (error) {
    console.log(error);
  }
}

function closeModal() {
  refs.modal.classList.add('is-hidden');
  clearContainer(refs.modalContaier);
  clearContainer(refs.modalPoster);
  window.removeEventListener('keydown', closeModalOnEsc);
  refs.body.classList.remove('no-scroll');
  refs.body.style.paddingRight = '0px';
  refs.lightBox.firstElementChild.style.left = '0px';
  refs.body.lastElementChild.style.visibility = 'visible';
}

function closeModalOnBackdrop(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}
function closeModalOnEsc(event) {
  if (event.key !== 'Escape') return;
  closeModal();
}
