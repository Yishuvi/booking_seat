
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const pool = req.app.get('db');

  try {
    await Pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);
    res.status(201).send({ message: 'User created' });
  } catch (err) {
    res.status(400).send({ error: 'User already exists or invalid input' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const pool = req.app.get('db');
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];

  if (!user) return res.status(401).send({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).send({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
  res.send({ token });
};