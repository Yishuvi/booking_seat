const pool = require('../utils/db');

exports.getSeats = async (req, res) => {
  const result = await pool.query('SELECT * FROM seats ORDER BY id');
  res.send(result.rows);
};

exports.reserveSeats = async (req, res) => {
  console.log('Request body:', req.body);
  const { count } = req.body;
  const userId = req.user.id;

  if (count < 1 || count > 7) {
    return res.status(400).send({ error: 'You can only book 1 to 7 seats' });
  }

  try {
    const result = await pool.query('SELECT * FROM seats WHERE is_reserved = false ORDER BY id');
    const available = result.rows;

    if (available.length < count) {
      return res.status(400).send({ error: 'Not enough seats available' });
    }

    const grouped = {};
    for (let seat of available) {
      const row = Math.floor((seat.id - 1) / 7);
      if (!grouped[row]) grouped[row] = [];
      grouped[row].push(seat);
    }

    let toBook = [];
    for (let row of Object.keys(grouped)) {
      if (grouped[row].length >= count) {
        toBook = grouped[row].slice(0, count);
        break;
      }
    }

    if (toBook.length === 0) {
      toBook = available.slice(0, count);
    }

    for (let seat of toBook) {
      await pool.query('UPDATE seats SET is_reserved = true, reserved_by = $1 WHERE id = $2', [userId, seat.id]);
    }

    res.send({ message: 'Seats booked', seats: toBook.map((s) => s.id) });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Booking failed' });
  }
};