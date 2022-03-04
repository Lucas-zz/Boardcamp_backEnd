import { Router } from 'express';
import { getCustomers, createCustomer, updateCustomer } from '../controllers/customersController';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware';
import customerSchema from '../schemas/customersSchema';

const customerRouter = Router();

customerRouter.get('/customers', getCustomers);
customerRouter.get('/customers/:id', getCustomers);
customerRouter.post('/customers', validateSchemaMiddleware(customerSchema), createCustomer);
customerRouter.put('/customers/:id', validateSchemaMiddleware(customerSchema), updateCustomer);

export default customerRouter;