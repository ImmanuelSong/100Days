import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex justify-around h-28 w-full items-center  text-3xl p-2 fixed top-0 left-0 z-10 bg-orange-50">
      <div className="font-bold">Top-20 Rated Movies</div>
      <ul>
        <li>
          <Link to="/" className="font-bold">
            Home
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
