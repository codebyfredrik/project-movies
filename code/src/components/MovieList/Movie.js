import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Movie.module.scss';

export const Movie = ({ id, poster_path, title, release_date }) => {
  return (
    <Link to={`/movies/${id}`}>
      <div className={styles.movie}>
        <img
          src={`https://image.tmdb.org/t/p/w780${poster_path}`}
          alt="poster"
        />
        <div className={styles.overlay}>
          <div className={styles.movieDetails}>
            <h1>{title}</h1>
            <p>Released: {release_date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};