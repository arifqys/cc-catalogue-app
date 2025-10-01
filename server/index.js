require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/cards', async (req, res) => {
  try {
    const cards = await prisma.card.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});

app.post('/api/cards', async (req, res) => {
  try {
    const { name, imageUrl, features, description, annualFee, applyLink } = req.body;
    
    if (!name || !imageUrl || !description || !applyLink) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const card = await prisma.card.create({
      data: {
        name,
        imageUrl,
        features: features || [],
        description,
        annualFee: annualFee || 0,
        applyLink
      }
    });

    res.status(201).json(card);
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ error: 'Failed to create card' });
  }
});

app.get('/api/cards/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const card = await prisma.card.findUnique({
      where: { id }
    });

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.json(card);
  } catch (error) {
    console.error('Error fetching card:', error);
    res.status(500).json({ error: 'Failed to fetch card' });
  }
});

app.patch('/api/cards/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, imageUrl, features, description, annualFee, applyLink } = req.body;

    const card = await prisma.card.findUnique({
      where: { id }
    });

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    const updatedCard = await prisma.card.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(imageUrl && { imageUrl }),
        ...(features && { features }),
        ...(description && { description }),
        ...(annualFee !== undefined && { annualFee }),
        ...(applyLink && { applyLink })
      }
    });

    res.json(updatedCard);
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).json({ error: 'Failed to update card' });
  }
});

app.delete('/api/cards/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const card = await prisma.card.findUnique({
      where: { id }
    });

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    await prisma.card.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ error: 'Failed to delete card' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
