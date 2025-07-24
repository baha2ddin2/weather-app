import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Alert,
  Stack,
  Avatar,
} from "@mui/material";

import axios from "axios";
import ThermostatIcon from '@mui/icons-material/Thermostat';

const weatherColors = {
  Sunny: { background: "#FFD93D", text: "#333333" },
  Clear: { background: "#FFD93D", text: "#333333" },
  Cloudy: { background: "#B0BEC5", text: "#2E2E2E" },
  Overcast: { background: "#90A4AE", text: "#2E2E2E" },
  Rain: { background: "#4A90E2", text: "#FFFFFF" },
  "Patchy rain possible": { background: "#4A90E2", text: "#FFFFFF" },
  Thunderstorm: { background: "#2F2F2F", text: "#FFFFFF" },
  Snow: { background: "#E0F7FA", text: "#37474F" },
  Mist: { background: "#CFD8DC", text: "#263238" },
  Fog: { background: "#CFD8DC", text: "#263238" },
  "Partly cloudy": { background: "#B0BEC5", text: "#2E2E2E" },
  Default: { background: "#FFFFFF", text: "#000000" }
}




export default function LocationComponent() {
  const [location, setLocation] = useState({ lat: 35.7673, lon: -5.7998 });
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(weather)
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setError("Permission denied or error getting location.");
      }
    );
  }, []);

  const getWeatherStyle = (condition) => {
    return weatherColors[condition] || weatherColors["Default"];
  };


  // Call Weather API when location changes
  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await axios.get("https://api.weatherapi.com/v1/forecast.json?", {
          params: {
            key: process.env.REACT_APP_API_KEY,
            q: `${location.lat},${location.lon}`,
          },
        });
        return response.data
      } catch (err) {
        setError("Error fetching weather data.");
      }
    }

    fetchWeather().then((res) => {
      setWeather(res)
      setLoading(false)
    }).catch((err) => {
      setLoading(false)
      setError(err)
    })
  }, [location]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <Paper elevation={4} sx={{
          p: 4,
          width: "60vw",
          height: "60vh",
          borderRadius: 4,
          backgroundColor: weather ? getWeatherStyle(weather.current.condition.text).background : "#FFFFFF",
          color: weather ? getWeatherStyle(weather.current.condition.text).text : "#000000"
        }}>
          {loading && (
            <Stack direction="row" display={"flex"} justifyContent="center" alignItems={"center"} sx={{ my: 2 }}>
              <CircularProgress />
            </Stack>
          )}

          {error && <Alert severity="error">{error}</Alert>}

          {weather && (
            <Stack spacing={2} alignItems="center">
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h2" sx={{ color: weather ? getWeatherStyle(weather.current.condition.text).text : "#000000" }}>
                  {weather.location.name}, {weather.location.country}
                </Typography>
                <Typography variant="h5" sx={{ color: weather ? getWeatherStyle(weather.current.condition.text).text : "#000000" , position : "relative", top : 30 ,left : 10 }}  >
                  {weather.location.localtime}
                </Typography>
              </div>
              <hr style={{ width: "95%", color: weather ? getWeatherStyle(weather.current.condition.text).text : "#000000" }} />
              <div style={{ display: "flex" }}>
                <div>
                  <Typography sx={{ color: weather ? getWeatherStyle(weather.current.condition.text).text : "#000000" }} variant="h1" >
                    {weather.current.temp_c}°C <ThermostatIcon/>
                  </Typography>

                  <Typography variant="h3" sx={{ color: weather ? getWeatherStyle(weather.current.condition.text).text : "#000000" }} color="text.secondary">
                    {weather.current.condition.text}
                  </Typography>
                  <Typography variant="h6" sx={{ color: weather ? getWeatherStyle(weather.current.condition.text).text : "#000000" }} color="text.secondary">

                      feels like {weather.current.feelslike_c} °C
                    </Typography>

                  <div style={{display: "flex" , gap : 10 , alignItems : "center"}}>
                    <Typography variant="subtitle1" sx={{ color: weather ? getWeatherStyle(weather.current.condition.text).text : "#000000" }} >
                      MIN : {weather.forecast.forecastday[0].day.mintemp_c}
                    </Typography>
                    |
                    <Typography variant="subtitle1" sx={{ color: weather ? getWeatherStyle(weather.current.condition.text).text : "#000000" }} >
                      MAX : {weather.forecast.forecastday[0].day.maxtemp_c}
                    </Typography>
                  </div>
                </div>
                <Avatar
                  alt="Weather icon"
                  src={`https:${weather.current.condition.icon}`}
                  sx={{ width: 300, height: 300 }}
                />
              </div>
            </Stack>
          )}
        </Paper>
      </Box>
    </>
  );
}
