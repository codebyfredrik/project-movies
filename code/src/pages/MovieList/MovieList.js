import React, { useState, useRef, useCallback } from 'react';
import TopBarProgress from 'react-topbar-progress-indicator';
import styles from './MovieList.module.scss';
import { Movie } from '../../components/MovieList/Movie';
import { useMovies } from '../../hooks/useMovies';

export const MovieList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, movies, hasMore } = useMovies(pageNumber);

  const observer = useRef();
  const lastMovieElementRef = useCallback(
    node => {
      let options = {
        rootMargin: '0px 0px 600px 0px'
      };
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('visible');
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      }, options);
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  TopBarProgress.config({
    barColors: {
      '0': '#ff0000',
      '1.0': '#ff0000'
    },
    shadowBlur: 5,
    barThickness: 2
  });

  return (
    <div>
      <div className={styles.movieList}>
        {movies.map((movie, index) => {
          if (movies.length === index + 1) {
            return (
              <div ref={lastMovieElementRef} key={movie.id}>
                <Movie {...movie} />
              </div>
            );
          } else {
            return (
              <div key={movie.id}>
                <Movie {...movie} />
              </div>
            );
          }
        })}
        <div>{loading && <TopBarProgress />}</div>
        <div>{error && 'Error loading'}</div>
      </div>
    </div>
  );
};
