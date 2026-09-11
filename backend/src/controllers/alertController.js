let { alerts } = require('../data/mockData');

exports.getAlerts = (req, res) => {
  res.json({
    success: true,
    mode: "DEMO DATA MODE",
    count: alerts.length,
    data: alerts
  });
};

exports.acknowledgeAlert = (req, res) => {
  const { id } = req.params;
  const alert = alerts.find(a => a.id === id);
  if (alert) {
    alert.acknowledged = true;
    alert.status = "ACKNOWLEDGED";
  }
  res.json({
    success: true,
    message: `Alert ${id} acknowledged successfully`,
    data: alert
  });
};

exports.dispatchTestNotification = (req, res) => {
  const { channel, recipient, alertId } = req.body;
  res.json({
    success: true,
    mode: "DEMO NOTIFICATION MODE",
    message: `Simulated ${channel || 'Dashboard'} notification sent successfully. (Real dispatch requires SMS/SMTP gateway).`,
    details: {
      channel: channel || "SMS / Email",
      recipient: recipient || "disaster-duty-officer@imd.gov.in",
      timestamp: new Date().toISOString(),
      alertId: alertId || "ALT-2026-001"
    }
  });
};
