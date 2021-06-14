import { getPosterPath } from './posterPath';

const movieAdapter = ({
  original_title,
  release_date,
  poster_path,
  vote_average,
  genre_ids,
  id,
  popularity,
  vote_count,
  overview,
  genres,
}) => ({
  imgSrc: getPosterPath(poster_path),
  title: original_title,
  rating: vote_average,
  releaseDate: checkDate(release_date),
  genre: genre_ids,
  id: id,
  popularity: popularity,
  votes: vote_count,
  about: overview,
  genres: genres,
});
export default movieAdapter;


function checkDate (date){
  if(!date){
    return date;
  }
  return date.slice(0, 4)
}