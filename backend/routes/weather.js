import express from 'express';
import { indianStates } from '../data/states.js';

const router = express.Router();

const generateWeatherData = (state) => {
  const stateTemps = {
    'Rajasthan': 35, 'Gujarat': 32, 'Maharashtra': 30, 'Karnataka': 28,
    'Tamil Nadu': 31, 'Kerala': 29, 'Goa': 30, 'Andhra Pradesh': 33,
    'Telangana': 32, 'Madhya Pradesh': 31, 'Uttar Pradesh': 28,
    'Bihar': 27, 'West Bengal': 29, 'Odisha': 30, 'Jharkhand': 27,
    'Chhattisgarh': 29, 'Punjab': 26, 'Haryana': 28, 'Delhi': 30,
    'Himachal Pradesh': 18, 'Uttarakhand': 20, 'Jammu and Kashmir': 15,
    'Ladakh': 10, 'Sikkim': 16, 'Arunachal Pradesh': 22, 'Assam': 26,
    'Meghalaya': 23, 'Nagaland': 24, 'Manipur': 25, 'Mizoram': 24,
    'Tripura': 27, 'Puducherry': 30
  };

  const baseTemp = stateTemps[state] || 28;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const conditions = ['Very Good', 'Good', 'Moderate', 'Poor'];
  const weights = [0.3, 0.4, 0.2, 0.1];
  const random = Math.random();
  let condition = 'Good';
  let cumWeight = 0;
  for (let i = 0; i < conditions.length; i++) {
    cumWeight += weights[i];
    if (random <= cumWeight) {
      condition = conditions[i];
      break;
    }
  }

  return {
    state,
    current: {
      temp: (baseTemp + Math.random() * 5 - 2).toFixed(1),
      humidity: (50 + Math.random() * 40).toFixed(0),
      windSpeed: (5 + Math.random() * 20).toFixed(1),
      visibility: (7 + Math.random() * 3).toFixed(1),
      condition,
      aqi: Math.floor(40 + Math.random() * 120)
    },
    forecast: days.map((day) => ({
      day,
      temp: (baseTemp + Math.random() * 8 - 4).toFixed(1),
      humidity: (45 + Math.random() * 45).toFixed(0),
      wind: (5 + Math.random() * 20).toFixed(1),
      precipitation: (Math.random() * 80).toFixed(0)
    })),
    hourly: Array.from({ length: 24 }, (_, i) => ({
      hour: ${i}:00,
      temp: (baseTemp + Math.sin(i / 4) * 6 + Math.random() * 3).toFixed(1),
      feels: (baseTemp + Math.sin(i / 4) * 6 + Math.random() * 3 - 2).toFixed(1)
    }))
  };
};

router.get('/:state', (req, res) => {
  const { state } = req.params;
  if (!indianStates.includes(state)) {
    return res.status(400).json({ error: 'Invalid state' });
  }
  const data = generateWeatherData(state);
  res.json(data);
});

export default router;