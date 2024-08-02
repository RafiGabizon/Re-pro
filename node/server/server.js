const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectToMongo = require('../db/mongoConnect');
const cookieParser = require('cookie-parser');
const usersRouter = require('../routes/users');
const authRoutes = require('../routes/auth');
require('dotenv').config();

const app = express();

// מידלוורים
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use(cors({
    origin: '*', // או 'http://localhost:3000' אם אתה רוצה לאפשר גישה מפורט 3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

connectToMongo();

// התחברות למסד הנתונים
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

// הגדרת נתיבים
app.use('/routes/users', usersRouter);

// נתיב ברירת מחדל
app.get('/', (req, res) => {
  res.send('Welcome to the admin panel server');
});

// הפעלת השרת
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));