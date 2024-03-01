import { useState, useEffect } from 'react';
import { fetchSearchMovie } from '../../API';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import css from './Movies.module.css';

const SearchMovie = () => {
  const [data, setData] = useState();
  const [query, setQuery] = useState('');
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onInputChange = event => setQuery(event.target.value);
  const reset = () => setQuery('');

  const onFormSubmit = event => {
    event.preventDefault();
    if (!query) {
      Notify.warning(`Type what you want to search.`);
      return;
    }
    setKeyword(query);
    navigate(`?query=${query}`);
    reset();
  };

  useEffect(() => {
    const key = searchParams.get('query');
    if (!key) return;

    fetchSearchMovie(key)
      .then(results => {
        if (results.length === 0) {
          Notify.info(
            `I couldn't find what you're searching for.`
          );
          return;
        }
        setData(results);
      })
      .catch(error => console.log(error));
  }, [keyword, searchParams]);

  return (
    <>
      <form className={css.form} onSubmit={onFormSubmit}>
        <input
        className={css.input}
          name="query"
          value={query}
          onChange={onInputChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Movie title"
        />
        <button className={css.btn} type="submit">Search</button>
      </form>
      {data && <MovieList array={data} />}
    </>
  );
};

export default SearchMovie;