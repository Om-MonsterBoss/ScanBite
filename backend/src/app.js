import express from 'express';
import { config } from './lib/config.js';
import connectDb from './lib/connection.js';
import router from './routes/auth.route.js';

const app=express();

const port=config.port;

app.use(express.json());


app.use('/api/auth',router)
app.get('/',(req,res)=>{
    res.send('Welcome to the API');
});
app.listen(port,async()=>{
    await connectDb();
    console.log(`Server is running on port ${port}`);
})