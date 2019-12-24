useEffect(() => {
  setIsLoading(true);
  API.getMovies()
    .then(data => {
      const { results } = data;
      const computedResults = results
        .filter(movie => {
          return (
            // Filtering out posters with inconsistent height and to get an even number of movies to display in the grid
            movie.id !== 516700 &&
            movie.id !== 651693 &&
            movie.id !== 11 &&
            movie.id !== 474350 &&
            movie.id !== 159323 &&
            movie.adult !== true
          );
        })
        .sort((a, b) => Date.parse(b.release_date) - Date.parse(a.release_date))
        .slice(0, 16);
      // console.log(computedResults);
      setMovies(computedResults);
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err); // Configure loading error state
    });
}, []);
