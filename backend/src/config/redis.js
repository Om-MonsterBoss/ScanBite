import IORedis from "ioredis";

const connection = new IORedis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    maxRetriesPerRequest: null,
});

connection.on("connect", () => {
    console.log("✅ Redis Connected");
});

connection.on("error", (err) => {
    console.log(err);
});

export default connection;