import { Router } from 'express';
import { getCustomers, createCustomer, updateCustomer } from '../controllers/customersController';
import { validateCustomer, validateUpdateCustomer } from '../middlewares/validateCustomersMiddleware';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware';
import customerSchema from '../schemas/customersSchema';

const customerRouter = Router();

customerRouter.get('/customers', getCustomers);
customerRouter.get('/customers/:id', getCustomers);
customerRouter.post('/customers', validateSchemaMiddleware(customerSchema), validateCustomer, createCustomer);
customerRouter.put('/customers/:id', validateSchemaMiddleware(customerSchema), validateUpdateCustomer, updateCustomer);

export default customerRouter;