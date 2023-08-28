const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
const mongoose = require('mongoose');
const path = require('path');
 

connectToMongo();

const app = express()
app.use(cors())
app.use(express.json())
const port = 5000

const Cards = new mongoose.Schema({
    title: String,
    description: String,
  });
  
  const Card = mongoose.model('Card', Cards);
  
  // Create a new item
  app.post('/create-card', async (req, res) => {
    try {
      const { title, description } = req.body;
      const newCard = new Card({ title, description });
      await newCard.save();
      res.status(201).json(newCard);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  app.get('/cards', async (req, res) => {
    try {
      const cards = await Card.find();
      res.status(200).json(cards);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  app.delete('/cards/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Card.findByIdAndDelete(id);
      res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  app.put('/cards/edit/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
  
      const updatedCard = await Card.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      );
  
      if (!updatedCard) {
        return res.status(404).json({ error: 'Card not found' });
      }
  
      res.status(200).json(updatedCard);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})