import { Queue } from "bullmq";
import connection from "../config/redis.js";

const welcomeQueue = new Queue("welcome-queue", {
    connection: connection,
});

export default welcomeQueue;