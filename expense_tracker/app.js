const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const path = require('path');  // Import the path module

const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'signup.html'));  // Use path.join to construct the correct file path
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
