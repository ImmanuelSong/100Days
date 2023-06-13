import React, { useEffect, useState } from "react";
import { HiSun, HiOutlineSun } from "react-icons/hi";
import { BsWind } from "react-icons/bs";
import { IoIosWater } from "react-icons/io";
import clear from "./images/clear.png";
import cloud from "./images/cloud.png";
import mist from "./images/mist.png";
import rain from "./images/rain.png";
import snow from "./images/snow.png";

const api = "82c677021bf925efb5d63d7bd94e7a96";

const WeatherBox = ({ city }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");

  const getData = async () => {
    const data = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`
      )
    ).json();

    setWeatherData(data);
    setLoading(false);
    console.log(data);
    switch (data.weather[0].main) {
      case "Clear":
        setImage(clear);
        break;

      case "Rain":
        setImage(rain);
        break;

      case "Snow":
        setImage(snow);
        break;

      case "Clouds":
        setImage(cloud);
        break;

      case "Mist":
        setImage(mist);
        break;

      default:
        image.src = "";
    }
  };
  useEffect(() => {
    getData();
  }, [city]);

  return (
    <div>
      {loading ? (
        <HiSun className="animate-ping text-5xl text-emerald-300" />
      ) : (
        <div className="w-[400px] h-[500px] bg-transparent rounded-lg shadow-lg shadow-emerald-100 flex flex-col justify-center items-center mt-10 border-solid border-2 border-emerald-200">
          <div className="fixed w-[150px] h-[150px] rounded-full bg-emerald-50 top-44 grid place-content-center border-dashed border-2 border-emerald-200">
            <img
              src={image}
              alt={weatherData.weather[0].main}
              className=" aspect-auto w-[100px] "
            />
          </div>
          <div className="flex flex-col gap-1 items-center  shadow-emerald-200 shadow-md  w-[220px] h-[250px] translate-y-14 pl-2 cursor-default">
            <div className="flex gap-5 mx-auto mb-2 text-emerald-500 text-lg uppercase">
              <span className="hover:font-bold">{weatherData.name}</span>
            </div>

            <div className="flex justify-between gap-5 mb-5 text-emerald-500 text-lg w-[90%] hover:border-2 hover:border-dashed hover:border-emerald-200 hover:scale-[1.01]">
              <h1>Curr. Temp</h1>
              <span>{weatherData.main.temp} °C</span>
            </div>
            <div className="flex justify-between gap-5 mb-5 text-emerald-500 text-lg w-[90%] hover:border-2 hover:border-dashed hover:border-emerald-200 hover:scale-[1.01]">
              <h1>Feels Like</h1>
              <span>{weatherData.main.feels_like} °C</span>
            </div>
            <div className="text-emerald-500 flex justify-between gap-5 mb-5 w-[90%] text-lg hover:border-2 hover:border-dashed hover:border-emerald-200 hover:scale-[1.01]">
              <BsWind className="translate-y-[5px]" />{" "}
              <span>{weatherData.wind.speed} m/s</span>
            </div>
            <div className="text-emerald-500 flex justify-between gap-5 text-lg w-[90%] relative hover:border-2 hover:border-dashed hover:border-emerald-200 hover:scale-[1.01]">
              <IoIosWater className="translate-y-[5px]" />
              <span>{weatherData.main.humidity} %</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherBox;
