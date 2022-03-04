import { Router } from 'express';
import categoryRouter from './categoriesRouter';
import customerRouter from './customersRouter';
import gamesRouter from './gamesRouter';

const router = Router();

router.use(categoryRouter);
router.use(gamesRouter);
router.use(customerRouter);

export default router;