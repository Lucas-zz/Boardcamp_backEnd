import { Router } from 'express';
import { getGames, createGame } from '../controllers/gamesController';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware';
import gameSchema from '../schemas/gameSchema';

const gamesRouter = Router();

gamesRouter.get('/games', getGames);
gamesRouter.post('/games', validateSchemaMiddleware(gameSchema), createGame);

export default gamesRouter;