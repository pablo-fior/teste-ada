import express from "express";
import { db } from "./db";
import { loginRouter } from "./routes/login";
import { verifyToken } from "./middleware/jwt_middleware";
import { cardsRouter } from "./routes/cards";
import { config } from "dotenv";
import { logger } from "./middleware/logger";

const envdir = process.cwd();

config({ path: `${envdir}/.env` });

const app = express();

app.use(express.json());

app.use(logger);

app.use('/login', loginRouter)

app.use('/cards', verifyToken, cardsRouter);

app.listen(process.env.PORT, async () => {
    await db.sync();
    console.log(`Server listening port: ${process.env.PORT}`);
});