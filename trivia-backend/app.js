const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const gameRoutes = require('./src/routes/gameRoutes');
const leaderboardRoutes = require('./src/routes/leaderboardRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Ajusta a tu puerto Vite
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // true en prod con HTTPS
}));

// Rutas
app.use('/api/game', gameRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});