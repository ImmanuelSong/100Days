import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  console.log(id);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
    console.log(movie);
  };

  useEffect(() => {
    getMovie();
  }, []);
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="h-screen w-screen relative flex justify-center items-center pt-[100px] flex-col bg-orange-50">
          <img
            src={movie.background_image_original}
            alt=""
            className=" h-[90%] w-4/6  aspect-auto blur-sm absolute top-12 z-1 "
          />
          <h1 className="text-2xl z-10">
            <span className="text-4xl  bg-clip-text text-transparent font-bold  bg-gradient-to-r from-orange-300 to-orange-700">
              {movie.title}
            </span>
          </h1>
          <img
            src={movie.medium_cover_image}
            alt={movie.title}
            className="w-[250px] aspect-auto rounded-lg mt-5 z-10 shadow-md shadow-white"
          />
          <div className="w-[600px] h-[100px] bg-white border-none rounded-lg shadow-md mt-3 z-10 p-2 overflow-hidden">
            <p className="text-md m-0 p-0 text-justify">
              {movie.description_full}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
