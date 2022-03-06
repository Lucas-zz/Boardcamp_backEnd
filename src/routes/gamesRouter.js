import { Router } from 'express';
import { getGames, createGame } from '../controllers/gamesController';
import { validateGame } from '../middlewares/validateGamesMiddleware';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware';
import gameSchema from '../schemas/gameSchema';

const gamesRouter = Router();

gamesRouter.get('/games', getGames);
gamesRouter.post('/games', validateSchemaMiddleware(gameSchema), validateGame, createGame);

export default gamesRouter;