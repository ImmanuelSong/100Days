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
        <div className="h-full w-full flex justify-center items-center mt-[140px] flex-col bg-blue-50">
          <h1 className="text-2xl">
            Details of <span className="text-3xl font-bold">{movie.title}</span>
          </h1>
          <img
            src={movie.medium_cover_image}
            alt={movie.title}
            className="w-[250px] aspect-auto rounded-lg mt-5"
          />
          <div className="w-[600px] bg-white border-none rounded-lg shadow-md mt-3">
            <p className="text-md">{movie.description_full}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
