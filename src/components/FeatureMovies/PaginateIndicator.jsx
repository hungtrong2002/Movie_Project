import { useEffect } from "react";

const PaginateIndicator = ({ movies, activeMovieId, setActiveMovieId }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMovieId((prevId) => {
        const currentIndex = movies.findIndex((movie) => movie.id === prevId);
        const nextIndex =
          currentIndex === -1 ? 0 : (currentIndex + 1) % movies.length;
        return movies[nextIndex].id;
      });
    }, 5000);

    return () => clearInterval(interval); // Cleanup khi component unmount
  }, [movies, setActiveMovieId]); // Đảm bảo chỉ chạy lại khi movies hoặc setActiveMovieId thay đổi

  // Slide tự động mỗi 3 giây
  return (
    <div className="absolute bottom-[10%] right-8">
      <ul className="flex gap-1">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className={`h-1 w-6 cursor-pointer transition-all duration-700 ${movie.id === activeMovieId ? "bg-slate-100" : "bg-slate-600"}`}
            onClick={() => setActiveMovieId(movie.id)}
          ></li>
        ))}
      </ul>
    </div>
  );
};
export default PaginateIndicator;
