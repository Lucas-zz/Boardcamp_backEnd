import { Router } from 'express';
import { getGames, createGame } from '../controllers/gamesController.js';
import { validateGame } from '../middlewares/validateGamesMiddleware.js';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js';
import gameSchema from '../schemas/gameSchema.js';

const gamesRouter = Router();

gamesRouter.get('/games', getGames);
gamesRouter.post('/games', validateSchemaMiddleware(gameSchema), validateGame, createGame);

export default gamesRouter;