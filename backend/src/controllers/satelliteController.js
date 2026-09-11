const { satelliteSources } = require('../data/mockData');

exports.getSatelliteSources = (req, res) => {
  res.json({
    success: true,
    mode: "DEMO DATA MODE",
    count: satelliteSources.length,
    data: satelliteSources
  });
};

exports.getSatelliteSourceById = (req, res) => {
  const source = satelliteSources.find(s => s.id === req.params.id);
  if (!source) {
    return res.status(404).json({ success: false, message: "Satellite source not found" });
  }
  res.json({
    success: true,
    data: source
  });
};
