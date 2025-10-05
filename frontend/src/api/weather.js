export const fetchWeather = async (state) => {
  const res = await fetch(`http://localhost:5000/api/weather/${state}`);
  if (!res.ok) throw new Error('Failed to fetch weather');
  return res.json();
};
