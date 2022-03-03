import { Router } from 'express';
import { getCategories, createCategory } from '../controllers/categoriesController';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware';
import categorySchema from '../schemas/categorySchema';

const categoryRouter = Router();

categoryRouter.get('/categories', getCategories);
categoryRouter.post('/categories', createCategory);

export default categoryRouter;