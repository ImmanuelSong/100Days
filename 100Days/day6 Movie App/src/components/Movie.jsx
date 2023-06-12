import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Movie = ({ id, coverImage, title, summary, genres }) => {
  return (
    <Link to={`/movie/${id}`}>
      <div className="group w-[400px] h-[400px] shadow-lg rounded-lg translate-y-[180px] bg-white hover:scale-110 transition-all ease-out delay-200">
        <img
          src={coverImage}
          alt={title}
          className="mx-auto rounded-md -translate-y-8"
        />
        <div className="text-center text-lg  transition-all ease-out delay-200 group-hover:font-bold group-hover:scale-110">
          {title}
        </div>
      </div>
    </Link>
  );
};

Movie.propTypes = {
  coverImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
};

export default Movie;
