import { Router } from 'express';
import { getCategories, createCategory } from '../controllers/categoriesController.js';
import { validateCategory } from '../middlewares/validateCategoriesMiddleware.js';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js';
import categorySchema from '../schemas/categorySchema.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', getCategories);
categoriesRouter.post('/categories', validateSchemaMiddleware(categorySchema), validateCategory, createCategory);

export default categoriesRouter;