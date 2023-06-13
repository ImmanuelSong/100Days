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

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <form onSubmit={handleSubmit} className="flex justify-between gap-2">
        <input
          className="w-[90%] h-[40px] shadow-lg uppercase rounded-lg pr-3 text-center border-2 text-emerald-700 placeholder-emerald-300 border-emerald-300 focus:outline-none focus:border-emerald-500 caret-emerald-400"
          type="text"
          placeholder="Enter a city name..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button type="submit" onClick={handleSubmit}>
          <HiRocketLaunch className="text-[30px] text-emerald-500 hover:scale-110 transition-all ease duration-200" />
        </button>
      </form>
      {citySet ? <WeatherBox city={city} /> : null}
    </div>
  );
};

export default Input;
