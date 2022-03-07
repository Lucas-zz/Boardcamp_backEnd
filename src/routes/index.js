import { Router } from 'express';
import categoryRouter from './categoriesRouter.js';
import customerRouter from './customersRouter.js';
import gamesRouter from './gamesRouter.js';
import rentalsRouter from './rentalsRouter.js';

const router = Router();

router.use(categoryRouter);
router.use(gamesRouter);
router.use(customerRouter);
router.use(rentalsRouter);

export default router;