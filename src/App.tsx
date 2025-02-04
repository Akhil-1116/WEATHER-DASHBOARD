import React, { useState } from 'react';
import axios from 'axios';
import { Cloud, Search, Wind, Droplets, Thermometer, Gauge } from 'lucide-react';
import type { WeatherData } from './types/weather';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '83c3f833819508098d27bd6877798d2b'; 
  
  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 flex items-center justify-center gap-2">
          <Cloud className="h-8 w-8 text-blue-500" />
          Weather App
        </h1>

        <form onSubmit={fetchWeather} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500"
              disabled={loading}
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>

        {loading && (
          <div className="text-center text-gray-600">Loading...</div>
        )}

        {error && (
          <div className="text-center text-red-500 mb-4">{error}</div>
        )}

        {weather && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">{weather.name}</h2>
              <div className="text-5xl font-bold text-blue-600 my-2">
                {Math.round(weather.main.temp)}°C
              </div>
              <p className="text-xl text-gray-600 capitalize">
                {weather.weather[0].description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
                <Thermometer className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Feels Like</p>
                  <p className="font-semibold text-gray-800">
                    {Math.round(weather.main.feels_like)}°C
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
                <Droplets className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="font-semibold text-gray-800">
                    {weather.main.humidity}%
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
                <Wind className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Wind Speed</p>
                  <p className="font-semibold text-gray-800">
                    {weather.wind.speed} m/s
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
                <Gauge className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Pressure</p>
                  <p className="font-semibold text-gray-800">
                    {weather.main.pressure} hPa
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;