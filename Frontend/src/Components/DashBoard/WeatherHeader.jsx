import React, { useEffect, useState } from "react";

const WeatherHeader = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("Fetching location...");
  const [weather, setWeather] = useState({
    temp: "--",
    condition: "Loading...",
    precipitation: "--",
    humidity: "--",
    wind: "--",
  });

  // 🕒 Update Date & Time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      const day = days[now.getDay()];
      const month = months[now.getMonth()];
      const dateNum = now.getDate();
      const year = now.getFullYear();

      let hours = now.getHours();
      let minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      setDate(`${dateNum} ${month} ${year}`);
      setTime(`${day}, ${hours}:${String(minutes).padStart(2, "0")} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 🌦️ Fetch Weather using Open-Meteo API
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      // Weather data
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weathercode`
      );
      const data = await res.json();

      const weatherDescriptions = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Foggy",
        48: "Rime fog",
        51: "Light drizzle",
        61: "Light rain",
        71: "Light snow",
        80: "Rain showers",
        95: "Thunderstorm",
      };

      const weathercode = data.current.weathercode;
      const desc = weatherDescriptions[weathercode] || "Unknown";

      setWeather({
        temp: data.current.temperature_2m,
        condition: desc,
        precipitation: data.current.precipitation || 0,
        humidity: data.current.relative_humidity_2m,
        wind: data.current.wind_speed_10m,
      });

      // Reverse Geocode to get city name
      const locRes = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const locData = await locRes.json();
      setLocation(`${locData.city || locData.locality || "Your Location"}`);
    });
  }, []);

  return (
    <header className="relative w-full h-[200px] p-6 rounded-2xl overflow-hidden text-white font-poppins mb-10 shadow-lg">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
        alt="Weather Background"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center h-full px-10 py-8">
        {/* Left Section - Date & Time */}
        <div>
          <h2 className="text-lg md:text-xl font-light">{date}</h2>
          <h1 className="text-4xl md:text-6xl font-bold mt-2">{time}</h1>
          <h4 className="text-lg font-light mt-2">{location}</h4>
        </div>

        {/* Right Section - Weather Info */}
        <div className="text-right mt-6 md:mt-0">
          <h2 className="text-3xl md:text-5xl font-semibold">
            {weather.temp}°C
          </h2>
          <h4 className="text-lg md:text-xl font-light">{weather.condition}</h4>
          <h3 className="text-sm font-light mt-2">
            Precipitation: {weather.precipitation}%
          </h3>
          <h3 className="text-sm font-light">
            Humidity: {weather.humidity}%
          </h3>
          <h3 className="text-sm font-light">
            Wind: {weather.wind} km/h
          </h3>
        </div>
      </div>
    </header>
  );
};

export default WeatherHeader;
