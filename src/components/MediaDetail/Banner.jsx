import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgressBar from "../CircularProgressBar";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { groupBy } from "lodash";
import ImageComponent from "../Image";
import { useModalContext } from "@components/Context/ModalProvider";

const Banner = ({
  title,
  backdropPath,
  posterPath,
  certification,
  crews,
  genres,
  releaseDate,
  point = 0,
  overview,
  trailerVideoKey,
}) => {
  const { setIsShowing, setContent } = useModalContext();
  const groupedCrews = groupBy(crews, "job");
  return (
    <div>
      <div className="relative overflow-hidden bg-black text-white shadow-md shadow-slate-800">
        <ImageComponent
          width={1200}
          height={800}
          src={`https://image.tmdb.org/t/p/original/${backdropPath}`}
          className="absolute inset-0 w-screen brightness-[.2]"
        />
        <div className="relative mx-auto flex max-w-screen-xl gap-6 px-6 py-10 sm:gap-8">
          <div className="flex-1">
            <ImageComponent
              width={600}
              height={900}
              src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${posterPath}`}
            />
          </div>
          <div className="flex-[2] text-[1.2vw]">
            <p className="mb-2 text-[2vw] font-bold">{title}</p>
            <div className="flex items-center gap-4">
              <span className="borer-gray-400 border p-1 text-gray-400">
                {certification}
              </span>
              <p>{releaseDate}</p>
              <p>{(genres || []).map((genre) => genre.name).join(", ")}</p>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CircularProgressBar
                  percent={Math.round(point * 10)}
                  size={3.5}
                  strokeWidth={0.3}
                />{" "}
                Rating
              </div>
              <button
                onClick={() => {
                  setIsShowing(true);
                  setContent(
                    <iframe
                      title="Trailer"
                      src={`https://www.youtube.com/embed/${trailerVideoKey}`}
                      className="aspect-video w-[50vw]"
                    />,
                  );
                }}
              >
                <FontAwesomeIcon
                  icon={faPlay}
                  className="mr-1"
                ></FontAwesomeIcon>
                Trailer
              </button>
            </div>
            <div>
              <p className="mb-2 text-[1.3vw] font-bold">Overview</p>
              <p>{overview}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {Object.keys(groupedCrews).map((job) => (
                <div key={job}>
                  <p className="font-bold">{job}</p>
                  <p>{groupedCrews[job].map((crew) => crew.name).join(", ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
