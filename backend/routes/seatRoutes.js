const express = require('express');
const router = express.Router();
const { getSeats, reserveSeats } = require('../controllers/seatController');
const authenticateToken = require('../middleware/authMiddleware');
const pool = require('../utils/db');

router.get('/', authenticateToken, getSeats);
router.post('/reserve', authenticateToken, reserveSeats);


router.post('/book', authenticateToken, reserveSeats);


router.post('/reset', authenticateToken, async (req, res) => {
  try {
    await pool.query('UPDATE seats SET status = $1', ['available']);
    res.json({ message: "All seats have been reset." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reset seats." });
  }
});

module.exports = router;