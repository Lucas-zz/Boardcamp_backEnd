import { Router } from 'express';
import { getRentals, createRental, returnRental, deleteRental } from '../controllers/rentalsController';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware';
import rentalSchema from '../schemas/gameSchema';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', validateSchemaMiddleware(rentalSchema), createRental);
rentalsRouter.post('/rentals:id/return', validateSchemaMiddleware(rentalSchema), returnRental);
rentalsRouter.delete('/rentals/:id', validateSchemaMiddleware(rentalSchema), deleteRental);

export default rentalsRouter;