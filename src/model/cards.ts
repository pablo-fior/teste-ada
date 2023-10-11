import { INTEGER, STRING } from "sequelize";
import { db } from "../db";

export const Cards = db.define('cards', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,  
    },
    titulo: {
      type: STRING,
      allowNull: false,
    },
    conteudo: {
      type: STRING,
      allowNull: false,
    },
    lista: {
      type: STRING,
      allowNull: false,
    }
});