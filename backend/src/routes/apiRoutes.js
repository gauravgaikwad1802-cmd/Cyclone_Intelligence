const express = require('express');
const router = express.Router();

const cycloneController = require('../controllers/cycloneController');
const satelliteController = require('../controllers/satelliteController');
const mlController = require('../controllers/mlController');
const alertController = require('../controllers/alertController');
const authController = require('../controllers/authController');

// Cyclone Routes
router.get('/cyclones', cycloneController.getAllCyclones);
router.get('/cyclones/active', cycloneController.getActiveCyclones);
router.get('/cyclones/history', cycloneController.getHistoricalCyclones);
router.get('/cyclones/:id', cycloneController.getCycloneById);

// Satellite Routes
router.get('/satellite', satelliteController.getSatelliteSources);
router.get('/satellite/:id', satelliteController.getSatelliteSourceById);

// AI / ML Routes
router.post('/detection', mlController.runDetection);
router.post('/classification', mlController.runClassification);
router.post('/prediction', mlController.runPrediction);

// Analytics & Alerts Routes
router.get('/analytics', cycloneController.getAnalytics);
router.get('/alerts', alertController.getAlerts);
router.post('/alerts/:id/acknowledge', alertController.acknowledgeAlert);
router.post('/alerts/dispatch', alertController.dispatchTestNotification);

// Auth Routes
router.post('/auth/login', authController.login);
router.get('/auth/me', authController.getProfile);

module.exports = router;
