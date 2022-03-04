import { Router } from 'express';
import categoryRouter from './categoriesRouter';
import customerRouter from './customersRouter';
import gamesRouter from './gamesRouter';
import rentalsRouter from './rentalsRouter';

const router = Router();

router.use(categoryRouter);
router.use(gamesRouter);
router.use(customerRouter);
router.use(rentalsRouter);

export default router;