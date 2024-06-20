const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const authController = {
  signup: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, email, password: hashedPassword });
      res.status(201).json({ message: 'User created successfully!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).json({ error: 'Invalid email or password' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful!', token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = authController;
