
import dotenv from 'dotenv';

dotenv.config()
export const config={
    mongodbUri:process.env.MONGODB_URI,
    port:process.env.PORT,
    auth_email:process.env.AUTH_EMAIL,
    auth_pass:process.env.AUTH_PASSWORD,
    redis_host:process.env.REDIS_HOST,
    redis_port:process.env.REDIS_PORT,
    frontend_url:process.env.Frontend_url
}