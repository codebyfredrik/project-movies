import { useEffect, useState } from 'react';
import axios from 'axios';
const APIKEY = 'aef86c04633f65d609cb44099db77ec6';

export const useMovies = pageNumber => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=${pageNumber}`,
      cancelToken: new axios.CancelToken(c => {
        cancel = c;
      })
    })
      .then(res => {
        setMovies(prevMovies => {
          return [
            ...prevMovies,
            ...res.data.results.filter(item => {
              return item.poster_path !== null && item.backdrop_path !== null;
            })
          ];
        });
        setHasMore(res.data.results.length > 0);
        setLoading(false);
      })
      .catch(e => {
        if (axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  }, [pageNumber]);

  return { loading, error, movies, hasMore };
};
