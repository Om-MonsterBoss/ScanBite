import { Worker } from "bullmq";
import connection from "../config/redis.js";
import { welcomeMail } from "../lib/mailing_service.js";

const worker = new Worker(
    "welcome-queue",

    async (job) => {

        console.log("Processing Job");

        console.log(job.data);

        console.log(
            `Welcome ${job.data.name}`
        );
        await welcomeMail(job.data);

    },

    {
        connection:connection,
    }
);

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
    console.log(err.message);
});