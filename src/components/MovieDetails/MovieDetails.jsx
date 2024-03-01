import { useState, useEffect, Suspense } from 'react';
import {
  Link,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { fetchMovieDetails } from '../../API';
import Loader from '../Loader/Loader';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const [data, setData] = useState();
  const { movieId } = useParams();
  useEffect(() => {
    fetchMovieDetails(movieId)
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, [movieId]);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={css.details}>
      {data && (
        <>
          <button
            className={css.btn}
            onClick={() => navigate(location.state ?? '/')}
          ><i className={css.arrow}></i>
            Back
          </button>
          <h1 className={css.title}>
            {data.original_title} {data.release_date.split('-')[0]}
          </h1>
          <h2 className={css.section}>
            User score: {Math.round(data.vote_average * 10)}%
          </h2>
          <img
            className={css.poster}
            src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`}
            alt={data.original_title}
          />
          <h2 className={css.section}>Overview</h2>
          <p className={css.content}>{data.overview}</p>
          <h2 className={css.section}>Genres</h2>
          <p className={css.content}>{data.genres.map(item => item.name).join(', ')}</p>
          <h2 className={css.section}>Additional inormation</h2>
          <ul className={css.content}>
            <li>
              <Link
                state={location.state}
                className={css.link}
                to={`/movies/${movieId}/cast`}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                state={location.state}
                className={css.link}
                to={`/movies/${movieId}/reviews`}
              >
                Reviews
              </Link>
            </li>
          </ul>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default MovieDetails;