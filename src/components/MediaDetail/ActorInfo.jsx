import ImageComponent from "../Image";

const ActorInfo = ({ id, name, character, profilePath, episodeCount }) => {
  console.log(name);
  console.log(character);
  console.log(profilePath);

  return (
    <div>
      <div className="h-full rounded-lg border border-slate-300 bg-black text-white shadow-sm">
        <ImageComponent
          src={
            profilePath
              ? `https://media.themoviedb.org/t/p/w276_and_h350_face${profilePath}`
              : "/ActorNoImage.svg"
          }
          className="rounded-lg"
          width={276}
          height={350}
        />
        <div className="p-3">
          <p className="font-bold">{name}</p>
          <p>{character}</p>
          {episodeCount && (
            <p>
              {episodeCount > 1
                ? `${episodeCount} Episodes`
                : `${episodeCount} Episode`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ActorInfo;
