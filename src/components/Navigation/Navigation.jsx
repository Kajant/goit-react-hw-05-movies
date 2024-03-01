import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Loader from '../Loader/Loader';
import css from './Navigation.module.css';

const MainWrapper = () => {
  return (
    <>
      <header>
        <nav className={css.nav}>
          <Link className={css.item} to="/">
            Home
          </Link>
          <p className={css.item}>|</p>
          <Link className={css.item} to="/movies">
            Movies
          </Link>
        </nav>
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default MainWrapper;