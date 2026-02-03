import React, { useState, useEffect } from "react";
import searchIcon from "../src/assets/search.png";
import cloud from "../src/assets/cloud.png";
import clear from "../src/assets/clear.png";
import drizzel from "../src/assets/drizzle.png";
import humidity from "../src/assets/humidity.png";
import rain from "../src/assets/rain.png";
import snow from "../src/assets/snow.png";
import wind from "../src/assets/wind.png";
import "./weather.css";

// Weather component: Main component for displaying weather information
function Weather() {
	// State to store the weather data fetched from the API
	const [data, setData] = useState("");
	// State to store the city name entered by the user
	const [city, setCity] = useState("London"); // Default city set to London for initial load
	// State to store any error messages
	const [error, setError] = useState("");

	// Function to fetch weather data from OpenWeatherMap API
	const fetchWeather = async (city) => {
		// Get the API key from environment variables (set in .env file)
		const api_key = import.meta.env.VITE_API_KEY;
		try {
			// Construct the API URL with city name, API key, and metric units
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

			// Fetch data from the API
			const response = await fetch(url);
			// Check if the response is ok (status 200-299)
			if (!response.ok) {
				throw new Error(`City not found or API error: ${response.status}`);
			}
			// Parse the JSON response
			const weatherData = await response.json();
			// Update the data state with the fetched weather data
			setData(weatherData);
			// Clear any previous error
			setError("");
			// Log the data for debugging
			console.log(weatherData);
		} catch (error) {
			// If there's an error, log it and set error state
			console.log("Error:", error.message);
			setError(error.message);
			setData(""); // Clear data on error
		}
	};

	// useEffect hook to fetch weather data when the component mounts (initial load)
	useEffect(() => {
		fetchWeather(city);
	}, []); // Empty dependency array means it runs only once on mount

	// Function to handle search button click
	const handleSearch = () => {
		if (city.trim()) {
			fetchWeather(city);
		} else {
			setError("Please enter a city name");
		}
	};

	// Function to get the appropriate weather icon based on the weather condition
	const getWeatherIcon = (weatherMain) => {
		switch (weatherMain) {
			case "Clear":
				return clear;
			case "Clouds":
				return cloud;
			case "Rain":
				return rain;
			case "Drizzle":
				return drizzel;
			case "Snow":
				return snow;
			default:
				return clear; // Default to clear if unknown
		}
	};

	return (
		<div className="weather">
			{/* Search bar for entering city name */}
			<div className="search-bar">
				<input
					type="text"
					placeholder="search"
					value={city}
					onChange={(e) => setCity(e.target.value)} // Update city state on input change
				/>
				{/* Search icon with click handler to trigger weather fetch */}
				<img
					src={searchIcon}
					alt="search"
					onClick={handleSearch} // Call handleSearch when clicked
					style={{ cursor: "pointer" }} // Make it look clickable
				/>
			</div>

			{/* Display error message if there's an error */}
			{error && (
				<p className="error" style={{ color: "red", textAlign: "center" }}>
					{error}
				</p>
			)}

			{/* Weather icon: Dynamically selected based on weather condition */}
			<img
				className="weather-icon"
				src={data?.weather ? getWeatherIcon(data.weather[0].main) : clear}
				alt="weather"
			/>
			{/* Temperature display */}
			<p className="temparature">
				{data?.main?.temp ? `${data.main.temp}°C` : "--"}
			</p>
			{/* Location display */}
			<p className="location">{data?.name || city}</p>

			{/* Weather data section: Humidity and wind speed */}
			<div className="weather-data">
				<div className="col">
					<img src={humidity} alt="humidity" />
					<div>
						<p>{data?.main?.humidity ? `${data.main.humidity}%` : "--"}</p>
						<span>humidity</span>
					</div>
				</div>

				<div className="col">
					<img src={wind} alt="wind" />
					<div>
						<p>{data?.wind?.speed ? `${data.wind.speed} km/h` : "--"}</p>
						<span>wind speed</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Weather;
