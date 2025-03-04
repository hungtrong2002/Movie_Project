import useFetch from "@hooks/useFetch";
import Movie from "./Movie";
import PaginateIndicator from "./PaginateIndicator";
import { useEffect, useState } from "react";
const FeatureMovie = () => {
  const [activeMovieId, setActiveMovieId] = useState();
  console.log("rendering");
  const { data: popularMoviesResponse } = useFetch({
    url: "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&include_video=true",
  });
  const { data: videoResults } = useFetch(
    {
      url: `/movie/${activeMovieId}/videos`,
    },
    { enabled: !!activeMovieId },
  );
  console.log(videoResults);
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
          .map((movie) => (
            <Movie
              key={movie.id}
              data={movie}
              trailerVideoKey={
                (videoResults?.results || []).find(
                  (video) =>
                    video.type === "Trailer" && video.site === "YouTube",
                )?.key
              }
            ></Movie>
          ))}

      <PaginateIndicator
        movies={movies}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
};
export default FeatureMovie;
