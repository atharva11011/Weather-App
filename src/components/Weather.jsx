import React, { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({
    location: { name: '', region: '', country: '', localtime: '' },
    current: { temp_c: '', condition: { text: '' } }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=3073a76447fe4ec397975304241806&q=${city}&aqi=yes`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      fetchWeather();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center border-2 border-blue-500 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl w-full px-4 py-8 bg-white  dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className=" flex text-3xl font-bold mb-4 text-gray-900  justify-center dark:text-white">Weather App</h1>
        <form className="max-w-md mx-auto mb-8">
          <label htmlFor="default-search" className="sr-only">Search City</label>
          <div className="relative">
            <input
              type="text"
              id="default-search"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter city name"
              className="block w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            <button
              type="button"
              onClick={fetchWeather}
              className="absolute right-0 top-0 h-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300"
            >
              Search
            </button>
          </div>
        </form>

        {loading && (
          <p className=" flex justify-center text-gray-700 dark:text-gray-300 mb-4">Loading...</p>
        )}
        {error && (
          <p className="p-3 text-sm text-red-500 rounded-lg bg-red-100 dark:bg-red-800 dark:text-red-400 mb-4">
            {error}
          </p>
        )}

        <div className="overflow-hidden rounded-lg">
          <table className="w-full text-sm text-gray-700 dark:text-gray-300 border-collapse">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-6 text-left">City Name</th>
                <th className="py-3 px-6 text-left">Local Time</th>
                <th className="py-3 px-6 text-left">Temperature</th>
                <th className="py-3 px-6 text-left">Condition</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition duration-300">
                <td className="py-4 px-6 ">
                  {weather.location.name
                    ? `${weather.location.name },${weather.location.region} - ${weather.location.country}`
                    : 'city'}
                </td>
                <td className="py-4 px-6">{weather.location.localtime || 'time'}</td>
                <td className="py-4 px-6">
                  {weather.current.temp_c ? `${weather.current.temp_c}°C` : 'temp'}
                </td>
                <td className="py-4 px-6">
                  {weather.current.condition.text || 'cloudy'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Weather;
