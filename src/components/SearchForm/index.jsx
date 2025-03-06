import { useForm } from "react-hook-form";
import FormField from "./FormField";
import MediaTypeInput from "./FormInput/MediaTypeInput";
import GenresInput from "./FormInput/GenresInput";
import RatingInput from "./FormInput/RatingInput";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SearchForm = ({ setSearchFormValues }) => {
  const [searchParams] = useSearchParams();
  const mediaType = searchParams.get("mediaType");
  console.log(mediaType);
  const { control, watch } = useForm({
    defaultValues: {
      mediaType: ["tv", "movie"].includes(mediaType) ? mediaType : "movie",
      genres: [],
      rating: "All",
    },
  });

  const formValues = watch();
  console.log(formValues);
  useEffect(() => {
    setSearchFormValues(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(formValues)]);
  return (
    <div className="broder rounded-lg p-4 shadow-md">
      <form className="space-y-3">
        <FormField
          name="mediaType"
          label="Media Type"
          control={control}
          Component={MediaTypeInput}
        />
        <FormField
          name="genres"
          label="Genres"
          control={control}
          Component={GenresInput}
        />
        <FormField
          name="rating"
          label="Ratings"
          control={control}
          Component={RatingInput}
        />
      </form>
    </div>
  );
};
export default SearchForm;
