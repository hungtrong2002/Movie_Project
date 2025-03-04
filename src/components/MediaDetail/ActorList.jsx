import ActorInfo from "./ActorInfo";
import { useState } from "react";
const ActorList = ({ actors = [] }) => {
  const [isShowMore, setisShowMore] = useState(false);
  const currentActors = isShowMore ? actors.slice(0, 32) : actors.slice(0, 4);
  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Actor</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {currentActors.map((actor) => (
          <ActorInfo
            key={actor.id}
            id={actor.id}
            name={actor.name}
            character={actor.character}
            profilePath={actor.profile_path}
            episodeCount={actor.episodeCount}
          />
        ))}
        <p
          className="mt-1 cursor-pointer"
          onClick={() => setisShowMore(!isShowMore)}
        >
          {isShowMore ? "Show Less" : "Show More"}
        </p>
      </div>
    </div>
  );
};
export default ActorList;
