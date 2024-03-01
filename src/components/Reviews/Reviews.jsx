import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../API';
import css from './Reviews.module.css';

const Reviews = () => {
  const [data, setData] = useState();
  const { movieId } = useParams();
  useEffect(() => {
    fetchMovieReviews(movieId)
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, [movieId]);

  return (
    <ul className={css.reviews}>
      {data && data.length > 0 ? (
        data.map(({ author, content, id }) => {
          return (
            <li className={css.item} key={id}>
              <p>{content}</p>
              <h2 className={css.author}>{author}</h2>
            </li>
          );
        })
      ) : (
        <p className={css.info}>There are no revievs yet.</p>
      )}
    </ul>
  );
};

export default Reviews;