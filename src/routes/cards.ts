import express from 'express';
import { deleteExistingCard, getSavedCards, saveCardService, updateSavedCard } from '../service/cards';

export const cardsRouter = express.Router();

cardsRouter.post('/', async (req, res) => {
  const body = req.body;

  try {
    const createdCard = await saveCardService(body);
  
    return res.status(201).json({
      success: true,
      card: createdCard,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });  
  }
});

cardsRouter.get('/', async (req, res) => {
  const cards = await getSavedCards();

  return res.status(200).json({
    success: true,
    cards,
  })
});

cardsRouter.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  try {
    const updatedCard = await updateSavedCard(id, body);

    return res.status(200).json({
      sucess: true,
      card: updatedCard,
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.message,
    })
  }
});

cardsRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const remainingCards = await deleteExistingCard(id);

    return res.status(200).json({
      sucess: true,
      cards: remainingCards,
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.message,
    })
  }
});