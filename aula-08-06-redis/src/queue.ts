import { Redis } from 'ioredis';

const producerRedis = new Redis("redis://localhost:6379");
const workerRedis = new Redis("redis://localhost:6379");

const QUEUE_NAME = "email_queue";

async function startWorker() {
  console.log("Worker waiting for tasks...");
  
  while (true) {
    const task = await workerRedis.blpop(QUEUE_NAME, 0);
    
    if (!task) continue;
    
    const [, taskData] = task;
    console.log(`Processing email delivery to: ${taskData}`);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`Email successfully sent to ${taskData}!\n`);
  }
}

async function simulateAPI() {
  console.log("API receiving requests...");
  
  const users = ["john@test.com", "mary@test.com", "charles@test.com"];
  
  for (const email of users) {
    console.log(`API queuing: ${email}`);
    await producerRedis.rpush(QUEUE_NAME, email);
  }
}

startWorker();

setTimeout(() => {
  simulateAPI();
}, 2000);