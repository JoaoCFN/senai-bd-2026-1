import { Redis } from 'ioredis';

const redis = new Redis("redis://localhost:6379");

async function querySlowDatabase(productId: string) {
  console.log(`[Slow DB] Calculating and fetching product ${productId}... (wait 5 seconds)`);
	
  await new Promise(resolve => setTimeout(resolve, 5000));

  return { id: productId, name: "Gaming Laptop", price: 5000 };
}

async function fetchProduct(productId: string) {
  const cacheKey = `product:${productId}`;

  console.time("Response time");

  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    console.log("[CACHE HIT] Data found in Redis!");
    console.log(JSON.parse(cachedData));
    console.timeEnd("Response time");
    console.log("-----------------------------------");
    return; 
  }

  console.log("[CACHE MISS] Data not in Redis. Going to main database...");
  const dbData = await querySlowDatabase(productId);
  
  await redis.set(cacheKey, JSON.stringify(dbData), 'EX', 10);
  console.log(dbData);

  console.timeEnd("Response time");
  console.log("-----------------------------------");
}

async function runLab() {
  await fetchProduct("123");
  await fetchProduct("123");
  await fetchProduct("123");
  
  console.log("Waiting 11 seconds for cache to expire...");

  setTimeout(async () => {
    await fetchProduct("123");

    redis.quit();
  }, 11000);
}

runLab();