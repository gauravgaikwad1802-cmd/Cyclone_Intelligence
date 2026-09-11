const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'sih_cyclone_intelligence_secret_key_2026';

exports.login = (req, res) => {
  const { email, password } = req.body;
  
  // Demo user credentials or any input in demo mode
  const user = {
    id: "USR-SIH-2026",
    name: "Dr. A. Sharma (Meteorologist)",
    email: email || "demo@cyclone-intelligence.gov.in",
    role: "Senior Scientist / SIH Judge Access",
    agency: "Indian Meteorological Department / SIH 2026"
  };

  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });

  res.json({
    success: true,
    message: "Login successful (Demo Mode)",
    token,
    user
  });
};

exports.getProfile = (req, res) => {
  res.json({
    success: true,
    user: {
      id: "USR-SIH-2026",
      name: "Dr. A. Sharma (Meteorologist)",
      email: "demo@cyclone-intelligence.gov.in",
      role: "Senior Scientist / SIH Judge Access",
      agency: "Indian Meteorological Department / SIH 2026"
    }
  });
};
