import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './MovieList.module.css';

const MovieList = ({ array }) => {
  const location = useLocation();

  return (
    <>
      <ul className={css.list}>
        {array.map(({ id, title }) => (
          <li key={id}>
            <Link
              state={location}
              className={css.link}
              to={`/movies/${id}`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

MovieList.propTypes = {
  array: PropTypes.array.isRequired,
};

export default MovieList;