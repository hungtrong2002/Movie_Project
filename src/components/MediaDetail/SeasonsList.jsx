import { useState } from "react";
import CircularProgressBar from "../CircularProgressBar";
import ImageComponent from "../Image";

const SeasonsList = ({ seasons = [] }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const seasonItems = isShowMore ? seasons.slice(0, 10) : seasons.slice(0, 2);
  return (
    <div className="mt-8 text-[1.3vw]">
      <p className="mb-4 text-[1.4vw] font-bold">Season</p>
      {seasonItems.map((season) => (
        <div
          key={season.id}
          className="mt-2 flex gap-4 rounded-lg border border-slate-200 p-3 shadow-md"
        >
          <ImageComponent
            width={130}
            height={195}
            className="w-1/4 rounded-lg"
            src={`https://media.themoviedb.org/t/p/w300${season.poster_path}`}
          />
          <div className="space-y-1">
            <p className="text-[1.4vw] font-bold">{season.name}</p>
            <div className="flex items-center gap-2">
              <p className="font-bold">Rating</p>
              <CircularProgressBar
                percent={Math.round(season.vote_average * 10)}
                size={2.5}
                strokeWidth={0.2}
              />
            </div>
            <p className="font-bold">
              <span>Release Date:</span> {season.air_date}
            </p>
            <p>{season.episode_count} Episodes</p>
            <p>{season.overview}</p>
          </div>
        </div>
      ))}
      <p
        className="mt-1 cursor-pointer"
        onClick={() => setIsShowMore(!isShowMore)}
      >
        {isShowMore ? "Show Less" : "Show More"}
      </p>
    </div>
  );
};
export default SeasonsList;
