import { Redis } from 'ioredis';

const redis = new Redis("redis://localhost:6379");

async function fetchWeatherFromAPI(city: string) {
  console.log(`[API] Fetching weather for ${city}... (this will take 4 seconds)`);

  await new Promise(resolve => setTimeout(resolve, 4000));

  return { city, temperature: "25°C", condition: "Sunny" };
}

async function getWeather(city: string) {
  console.time(`Time for ${city}`);
  
  const weather = await fetchWeatherFromAPI(city);
  console.log(weather);

  console.timeEnd(`Time for ${city}`);
  console.log("-----------------------------------");
}

async function runChallenge() {
  console.log("--- FIRST CALL (Should take ~4s) ---");
  await getWeather("Sao Paulo");

  console.log("--- SECOND CALL (Should be instant) ---");
  await getWeather("Sao Paulo");

  redis.quit();
}

runChallenge();