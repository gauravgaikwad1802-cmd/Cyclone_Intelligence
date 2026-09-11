/**
 * AI/ML Pipeline REST Controller
 */
exports.runDetection = (req, res) => {
  const { imageId, region } = req.body;
  res.json({
    success: true,
    mode: "DEMO ML INFERENCE",
    pipelineStage: "CYCLONE_DETECTION",
    modelVersion: "Vision Transformer ViT-B/16 v1.4.2",
    result: {
      cycloneDetected: true,
      detectionConfidence: 92.8,
      region: region || "Bay of Bengal",
      centerCoordinates: { latitude: 15.40, longitude: 88.20 },
      boundingBox: { xMin: 180, yMin: 150, width: 180, height: 180 },
      eyeDefinitionScore: 0.86,
      minCloudTopTempKelvin: 194.5
    }
  });
};

exports.runClassification = (req, res) => {
  const { cycloneId } = req.body;
  res.json({
    success: true,
    mode: "DEMO ML INFERENCE",
    pipelineStage: "PATTERN_CLASSIFICATION",
    modelVersion: "Spatial Feature Classifier v2.1.0",
    result: {
      cycloneId: cycloneId || "CYC-2026-BOB-01",
      primaryPattern: "Rapid Intensification Pattern",
      confidence: 87.3,
      probabilities: [
        { pattern: "Rapid Intensification Pattern", probability: 87.3 },
        { pattern: "Mature Cyclone", probability: 9.2 },
        { pattern: "Organized Cyclone", probability: 2.5 },
        { pattern: "Developing System", probability: 1.0 }
      ],
      features: [
        { name: "CDO Expansion Rate", importance: 0.34 },
        { name: "Inner Core Convective Banding", importance: 0.28 },
        { name: "Outflow Symmetry Index", importance: 0.21 },
        { name: "SST Anomaly (>29.5°C)", importance: 0.17 }
      ]
    }
  });
};

exports.runPrediction = (req, res) => {
  const { cycloneId, forecastWindow } = req.body;
  res.json({
    success: true,
    mode: "DEMO ML INFERENCE",
    pipelineStage: "CYCLONE_PREDICTION",
    modelVersion: "LSTM / Trajectory Transformer v2.8.0",
    result: {
      cycloneId: cycloneId || "CYC-2026-BOB-01",
      overallConfidence: 91.4,
      forecastWindow: forecastWindow || "72 Hours",
      predictions: [
        { hour: 24, forecastTime: "24 Hours", latitude: 17.10, longitude: 86.80, windSpeedKt: 90, pressureHpa: 960, category: "Very Severe Cyclonic Storm", uncertaintyRadiusKm: 45, confidence: 93.2 },
        { hour: 48, forecastTime: "48 Hours", latitude: 19.30, longitude: 85.50, windSpeedKt: 105, pressureHpa: 948, category: "Extremely Severe Cyclonic Storm", uncertaintyRadiusKm: 85, confidence: 89.4 },
        { hour: 72, forecastTime: "72 Hours", latitude: 21.60, longitude: 85.10, windSpeedKt: 60, pressureHpa: 985, category: "Cyclonic Storm (Post-Landfall)", uncertaintyRadiusKm: 140, confidence: 82.1 }
      ]
    }
  });
};
