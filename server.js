const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const favoritesRouter = require('./routes/favorites');
const authRouter = require('./routes/auth').router;

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(cors({
  origin: 'https://gif-search-app-mern.netlify.app', 
}));

app.use(express.json());
app.use('/api', favoritesRouter);
app.use('/auth', authRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
