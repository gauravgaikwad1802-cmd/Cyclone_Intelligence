const { cyclones, analyticsSummary } = require('../data/mockData');

exports.getAllCyclones = (req, res) => {
  const { region, status, category } = req.query;
  let filtered = [...cyclones];

  if (region) {
    filtered = filtered.filter(c => c.region.toLowerCase().includes(region.toLowerCase()));
  }
  if (status) {
    filtered = filtered.filter(c => c.status.toLowerCase() === status.toLowerCase());
  }
  if (category) {
    filtered = filtered.filter(c => c.category.toLowerCase().includes(category.toLowerCase()));
  }

  res.json({
    success: true,
    mode: "DEMO DATA MODE",
    count: filtered.length,
    data: filtered
  });
};

exports.getActiveCyclones = (req, res) => {
  const active = cyclones.filter(c => c.status === "ACTIVE");
  res.json({
    success: true,
    mode: "DEMO DATA MODE",
    count: active.length,
    data: active
  });
};

exports.getCycloneById = (req, res) => {
  const cyclone = cyclones.find(c => c.id === req.params.id || c.code === req.params.id);
  if (!cyclone) {
    return res.status(404).json({ success: false, message: "Cyclone record not found" });
  }
  res.json({
    success: true,
    mode: "DEMO DATA MODE",
    data: cyclone
  });
};

exports.getHistoricalCyclones = (req, res) => {
  const history = cyclones.filter(c => c.status === "HISTORICAL");
  res.json({
    success: true,
    mode: "DEMO DATA MODE",
    count: history.length,
    data: history
  });
};

exports.getAnalytics = (req, res) => {
  res.json({
    success: true,
    mode: "DEMO DATA MODE",
    data: analyticsSummary
  });
};
