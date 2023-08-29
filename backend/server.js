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
    column: String,
  });
  
  const TODOCards = mongoose.model('Todo Cards', Cards);
  const DoingCards = mongoose.model('Doing Cards', Cards);
  const DoneCards = mongoose.model('Done Cards', Cards);
  
  // Create a new Cards
  app.post('/create-todocard', async (req, res) => {
    try {
      const { title, description, column } = req.body;
      const newCard = new TODOCards({ title, description ,column });
      await newCard.save();
      res.status(201).json(newCard);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  app.post('/create-doingcard', async (req, res) => {
    try {
      const { title, description, column } = req.body;
      const newCard = new DoingCards({ title, description ,column });
      await newCard.save();
      res.status(201).json(newCard);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  app.post('/create-donecard', async (req, res) => {
    try {
      const { title, description, column } = req.body;
      const newCard = new DoneCards({ title, description ,column });
      await newCard.save();
      res.status(201).json(newCard);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });


  //Fetch cards
  app.get('/todo-cards', async (req, res) => {
    try {
      const todoCards = await TODOCards.find();
      res.status(200).json(todoCards);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  app.get('/doing-cards', async (req, res) => {
    try {
      const todoCards = await DoingCards.find();
      res.status(200).json(todoCards);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  app.get('/done-cards', async (req, res) => {
    try {
      const todoCards = await DoneCards.find();
      res.status(200).json(todoCards);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  

  //Delete cards
  app.delete('/todo-cards/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const cardToDelete = await TODOCards.findById(id);
  
      if (!cardToDelete) {
        return res.status(404).json({ error: 'Card not found' });
      }
  
      if (cardToDelete.column !== 'todo') {
        return res.status(403).json({ error: 'Card is not in the "todo" column' });
      }
  
      const deletedCard = await TODOCards.findByIdAndDelete(id);
  
      res.status(200).json(deletedCard);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  app.delete('/doing-cards/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const cardToDelete = await DoingCards.findById(id);
  
      if (!cardToDelete) {
        return res.status(404).json({ error: 'Card not found' });
      }
  
      if (cardToDelete.column !== 'doing') {
        return res.status(403).json({ error: 'Card is not in the "doing" column' });
      }
  
      const deletedCard = await DoingCards.findByIdAndDelete(id);
  
      res.status(200).json(deletedCard);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  app.delete('/done-cards/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const cardToDelete = await DoneCards.findById(id);
  
      if (!cardToDelete) {
        return res.status(404).json({ error: 'Card not found' });
      }
  
      if (cardToDelete.column !== 'done') {
        return res.status(403).json({ error: 'Card is not in the "done" column' });
      }
  
      const deletedCard = await DoneCards.findByIdAndDelete(id);
  
      res.status(200).json(deletedCard);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  //Edit cards
  app.put('/todocards/edit/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
  
      const updatedCard = await TODOCards.findByIdAndUpdate(
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

  app.put('/doingcards/edit/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
  
      const updatedCard = await DoingCards.findByIdAndUpdate(
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

  app.put('/donecards/edit/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
  
      const updatedCard = await DoneCards.findByIdAndUpdate(
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