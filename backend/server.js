import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import weatherRoutes from './routes/weather.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/weather', weatherRoutes);
app.use('/api/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(✅ Backend running on port ${PORT}));