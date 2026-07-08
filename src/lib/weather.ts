const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export interface GeoResult {
  name: string;
  latitude: number;
  longitude: number;
  admin1?: string;
  country?: string;
}

export interface CurrentWeather {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  pressure_msl: number;
}

export interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  weather_code: number[];
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  apparent_temperature: number[];
  precipitation: number[];
  precipitation_probability: number[];
  weather_code: number[];
  wind_speed_10m: number[];
  relative_humidity_2m: number[];
  uv_index: number[];
}

export interface ForecastData {
  current: CurrentWeather;
  daily: DailyWeather;
  hourly: HourlyWeather;
}

export async function searchCity(query: string): Promise<GeoResult[]> {
  const res = await fetch(`${GEO_URL}?name=${encodeURIComponent(query)}&count=5&language=fr`);
  const data = await res.json();
  return data.results ?? [];
}

export async function fetchWeather(lat: number, lon: number): Promise<ForecastData> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,pressure_msl",
    hourly: "temperature_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature,uv_index",
    daily: "temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,weather_code",
    timezone: "auto",
    forecast_days: "7",
  });
  const res = await fetch(`${FORECAST_URL}?${params}`);
  return res.json();
}
