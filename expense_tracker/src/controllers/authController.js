const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const authController = {
  signup: (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ error: err });
      User.create({ username, email, password: hash }, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'User created successfully!' });
      });
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email, (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0) return res.status(401).json({ error: 'Invalid email or password' });
      const user = results[0];
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) return res.status(500).json({ error: err });
        if (!match) return res.status(401).json({ error: 'Invalid email or password' });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful!', token });
      });
    });
  }
};

module.exports = authController;
