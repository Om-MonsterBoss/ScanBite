import express from 'express';
import { config } from './lib/config.js';
import connectDb from './lib/connection.js';
import router from './routes/auth.route.js';
import cors from 'cors';
import scannerRoute from './routes/scanner.route.js';

const app = express();

const port = config.port;

app.use(express.json());

app.use(cors({
    origin: config.frontend_url,
    credentials: true,
}));

app.use('/api/auth', router);
app.use('/api/scanner',scannerRoute)

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

const startServer = async () => {
    try {
        // Connect MongoDB FIRST
        await connectDb();

        console.log('✅ MongoDB Connected');

        // Start server ONLY after MongoDB connects
        app.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error.message);

        process.exit(1);
    }
};

startServer();