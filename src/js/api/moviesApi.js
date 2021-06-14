import options from '../setting';
import spinner from '../components/spinner';

const { API_KEY, BASE_URL } = options;

export default class FilmotekaApiService {
  constructor(_params) {
    this.searchQuery = '';
    this.page = 1;
    this.totalPages = 500;
  }
  async fetchResults() {
    const urlPopular = `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${this.page}`;
    spinner.show();
    const response = await fetch(urlPopular);
    const moviesLists = await response.json();
    spinner.hide();
    return moviesLists;
  }
  async fetchSearch() {
    const urlSearch = `${BASE_URL}search/movie?api_key=${API_KEY}&page=${this.page}&query=${this.searchQuery}`;
    spinner.show();
    const response = await fetch(urlSearch);
    const moviesLists = await response.json();
    spinner.hide();
    return moviesLists;
  }
  async fetchMovies(id) {
    const urlSearch = `${BASE_URL}movie/${id}?api_key=${API_KEY}`;
    spinner.show();
    const response = await fetch(urlSearch);
    const movieData = await response.json();
    spinner.hide();
    return movieData;
  }

  incrementPage() {
    console.log(this.page);
    if (this.currentPage === this.totalPages) {
      return;
    }
    this.page += 1;
  }
  decrementPage() {
    if (this.page === 1) {
      return;
    }
    this.page -= 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
