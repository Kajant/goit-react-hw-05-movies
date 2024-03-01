import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../API';
import MovieList from '../../components/MovieList/MovieList';
import css from './Home.module.css';

const Home = () => {
  const [data, setData] = useState();
  useEffect(() => {
    fetchTrendingMovies()
      .then(results => setData(results))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <p className={css.title}>Trending Today</p>
      {data && <MovieList array={data} />}
      
    </>
  );
};

export default Home;