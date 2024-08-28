const mongoose = require('mongoose');
const favoriteSchema = new mongoose.Schema({
    gifUrl: { type: String, required: true },
    title: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  });
  
  module.exports = mongoose.model('Favorite', favoriteSchema);
  