import { Router } from 'express';
import { getCustomers, createCustomer, updateCustomer } from '../controllers/customersController.js';
import { validateCustomer, validateUpdateCustomer } from '../middlewares/validateCustomersMiddleware.js';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js';
import customerSchema from '../schemas/customersSchema.js';

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomers);
customersRouter.post('/customers', validateSchemaMiddleware(customerSchema), validateCustomer, createCustomer);
customersRouter.put('/customers/:id', validateSchemaMiddleware(customerSchema), validateUpdateCustomer, updateCustomer);

export default customersRouter;