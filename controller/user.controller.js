const db = require('../models/db');

module.exports.user = (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (error, rows) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ result: false, message: 'Internal server error' });
    }

    console.log(rows);
    return res.json(rows);
  });
};
