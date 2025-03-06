import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import SearchForm from "@components/SearchForm";
import useFetch from "@hooks/useFetch";
import { useState } from "react";

const SearchPage = () => {
  const [searchFormValues, setSearchFormValues] = useState({
    mediaType: "movie",
    genres: [],
    rating: "All",
  });
  console.log(searchFormValues);
  const [minRating, maxRating] =
    searchFormValues.rating === "All"
      ? [0, 100]
      : searchFormValues.rating.split(" - ");
  const { data } = useFetch({
    url: `/discover/${searchFormValues.mediaType}?with_genres=${searchFormValues.genres.join(",")}&vote_average.gte=${minRating / 10}&vote_average.lte=${maxRating / 10}`,
  });
  console.log(minRating, maxRating);
  console.log(data);
  console.log(searchFormValues);
  return (
    <div className="container flex-col">
      <p className="text-2xl font-bold">Search</p>
      <div className="flex gap-2">
        <div className="flex-1">
          <SearchForm setSearchFormValues={setSearchFormValues} />
        </div>
        <div className="flex-[3]">
          <RelatedMediaList mediaList={data.results || []} />
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
