import { Router } from 'express';
import { getRentals, createRental, returnRental, deleteRental } from '../controllers/rentalsController';
import { validateRental, validateCheckOutRental } from '../middlewares/validateRentalsMiddleware';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware';
import rentalSchema from '../schemas/gameSchema';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', validateSchemaMiddleware(rentalSchema), validateRental, createRental);
rentalsRouter.post('/rentals:id/return', validateSchemaMiddleware(rentalSchema), validateCheckOutRental, returnRental);
rentalsRouter.delete('/rentals/:id', validateSchemaMiddleware(rentalSchema), validateCheckOutRental, deleteRental);

export default rentalsRouter;