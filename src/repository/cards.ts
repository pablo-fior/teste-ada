import { where } from "sequelize";
import { Cards } from "../model/cards";

export const saveCard = async (card: { 
  titulo: string,
  conteudo: string,
  lista: string,
}) => {
  const createdCard = await Cards.create({
    titulo: card.titulo,
    conteudo: card.conteudo,
    lista: card.lista,
  });

  return createdCard;
};

export const getCards = async () => {
  const cards = await Cards.findAll();

  return cards;
};

export const updateCard = async (id: number, card: {
  titulo: string,
  conteudo: string,
  lista: string,
}) => {
  const existingCard = await Cards.findOne({
    where:  { id },
  });

  if (!existingCard) {
    throw new Error("Não existe card com ese id");
  }
  
  await existingCard.update({
    titulo: card.titulo,
    conteudo: card.conteudo,
    lista: card.lista,
  });

  await existingCard.save()
  
  return existingCard;
}

export const deleteCard = async (id: number) => {
  const card = await Cards.findOne({ where: { id } });

  if (!card) {
    throw new Error("Não existe card com ese id");  
  }

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
  
  console.log(`${formattedDate} - Card ${card.get('id')} - ${card.get('titulo')} Removido`);

  await card.destroy();

  const remainingCards = await getCards();

  return remainingCards;
};