const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const { authenticate } = require('./auth'); 

router.get('/favorites', authenticate, async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/favorites', authenticate, async (req, res) => {
  const { gifUrl, title } = req.body;
  const favorite = new Favorite({
    gifUrl,
    title,
    userId: req.user,
  });
  try {
    const newFavorite = await favorite.save();
    res.status(201).json(newFavorite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/favorites/:id', authenticate, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ _id: req.params.id, userId: req.user });
    if (!favorite) return res.status(404).json({ message: 'Favorite not found' });
    await favorite.remove();
    res.json({ message: 'Favorite deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
