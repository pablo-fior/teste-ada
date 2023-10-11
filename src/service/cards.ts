import { saveCard, getCards, updateCard, deleteCard } from "../repository/cards";

interface ICard {
  titulo: string;
  conteudo: string;
  lista: string;
}

export const saveCardService = async(card: ICard) => {
  validateCard(card);
  
  const createdCard = await saveCard(card);

  return createdCard;
};

export const getSavedCards = async () => {
  const cards = await getCards();

  return cards;
};

export const updateSavedCard = async (id: number, card: ICard) => {  
  validateCard(card);

  const updatedCard = await updateCard(id, card);

  const date = new Date();
  const formattedDate =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear()
       +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();
  
  console.log(`${formattedDate} - Card ${updatedCard.get('id')} - ${updatedCard.get('titulo')} Alterado`);

  return updatedCard;
}

export const deleteExistingCard = async (id: number) => {
  const remainingCards = await deleteCard(id);
  
  return remainingCards;
};

const validateCard = (card) => {
  if (!card?.conteudo) {
    throw new Error('Parâmetro "conteudo" é necessário');
  }

  if (!card?.titulo) {
    throw new Error('Parâmetro "titulo" é necessário');
  }

  if (!card?.lista) {
    throw new Error('Parâmetro "lista" é necessário');
  }
};