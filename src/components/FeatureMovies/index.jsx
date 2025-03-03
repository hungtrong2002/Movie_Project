import useFetch from "@hooks/useFetch";
import Movie from "./Movie";
import PaginateIndicator from "./PaginateIndicator";
import { useEffect, useState } from "react";
const FeatureMovie = () => {
  const [activeMovieId, setActiveMovieId] = useState();
  console.log("rendering");
  const { data: popularMoviesResponse } = useFetch({
    url: "/movie/popular",
  });
  const movies = (popularMoviesResponse.results || []).slice(0, 4);
  useEffect(() => {
    if (movies[0]?.id) {
      setActiveMovieId(movies[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(movies)]);
  console.log(movies);
  return (
    <div className="relative text-white">
      {movies.length > 1 &&
        movies
          .filter((movie) => movie.id === activeMovieId)
          .map((movie) => <Movie key={movie.id} data={movie}></Movie>)}

      <PaginateIndicator
        movies={movies}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
};
export default FeatureMovie;
