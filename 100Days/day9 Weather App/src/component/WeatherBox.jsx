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

const WeatherBox = (city) => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");

  const getData = async () => {
    const data = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.city}&units=metric&appid=${api}`
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
        <HiSun className="animate-ping text-5xl text-red-300" />
      ) : (
        <div className="w-[400px] h-[500px] bg-transparent rounded-lg shadow-lg shadow-red-100 flex flex-col justify-center items-center mt-10 border-solid border-2 border-red-200">
          <div className="fixed w-[150px] h-[150px] rounded-full bg-red-50 top-44 flex justify-center items-center border-dashed border-2 border-red-200">
            <img
              src={image}
              alt={weatherData.weather[0].main}
              className=" aspect-auto w-[100px]"
            />
          </div>
          <div className="flex flex-col gap-2  shadow-red-200 shadow-md  w-[50%] h-[200px] translate-y-14 pl-2">
            <div className="flex gap-5 mb-5 text-red-500 text-lg">
              <h1>Curr. Temp</h1>
              <span>{weatherData.main.temp} °C</span>
            </div>
            <div className="flex gap-5 mb-5 text-red-500 text-lg">
              <h1>Feels Like</h1>
              <span>{weatherData.main.feels_like} °C</span>
            </div>
            <div className="text-red-500 flex gap-5 mb-5 text-lg">
              <BsWind className="translate-y-[5px]" />{" "}
              <span>{weatherData.wind.speed} m/s</span>
            </div>
            <div className="text-red-500 flex gap-5 text-lg relative">
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
