import { useState } from "react";
import { HiRocketLaunch, HiChevronDoubleLeft } from "react-icons/hi2";
import WeatherBox from "./WeatherBox";

const Input = () => {
  const [input, setInput] = useState("");
  const [city, setCity] = useState("");
  const [citySet, setCitySet] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(input);
    setCitySet(true);
    setInput("");
  };

  const handleClick = () => {
    setCitySet(false);
    setCity("");
    setInput("");
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <form onSubmit={handleSubmit} className="flex justify-between gap-2">
        <input
          className="w-[90%] h-[40px] shadow-lg uppercase rounded-lg pr-3 text-center border-2 text-red-400 placeholder-red-300 border-red-300 focus:outline-none focus:border-red-500 caret-red-400"
          type="text"
          placeholder="Enter a city name..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button type="submit" onClick={handleSubmit}>
          <HiRocketLaunch className="text-[30px] text-red-500 hover:scale-125 transition-all ease duration-500" />
        </button>
      </form>
      {citySet ? <WeatherBox city={city} /> : null}
    </div>
  );
};

export default Input;
