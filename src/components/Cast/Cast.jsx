import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../API';
import css from './Cast.module.css';
import example from '../../images/example.svg';

const Cast = () => {
  const [data, setData] = useState();
  const { movieId } = useParams();
  useEffect(() => {
    fetchMovieCredits(movieId)
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, [movieId]);

  return (
    <div>
      <ul className={css.cast}>
        {data &&
          data.map(({ id, profile_path, name, character }) => {
            return (
              <li className={css.item} key={id}>
                <div className={css.img_holder}>
                  <img
                    className={css.img}
                    src={
                      profile_path
                        ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                        : example
                    }
                    alt={name}
                  />
                </div>
                <div className={css.label}>
                  <h2>{name}</h2>
                  <p>{character}</p>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Cast;