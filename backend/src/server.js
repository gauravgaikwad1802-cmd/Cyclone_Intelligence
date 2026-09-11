const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: "ONLINE",
    system: "CYCLONE INTELLIGENCE BACKEND API",
    mode: "DEMO DATA MODE",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` CYCLONE INTELLIGENCE BACKEND API SERVER RUNNING    `);
  console.log(` Port: ${PORT}`);
  console.log(` Status: DEMO DATA MODE ACTIVE                      `);
  console.log(` API Endpoint: http://localhost:${PORT}/api         `);
  console.log(`====================================================`);
});
