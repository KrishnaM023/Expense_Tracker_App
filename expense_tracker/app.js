const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const expenseRoutes = require('./src/routes/expense');
const path = require('path');  // Import the path module

const sequelize = require('./src/config/db');
const User = require('./src/models/User');

const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/expense', expenseRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'signup.html')); 
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'login.html'));
});

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
