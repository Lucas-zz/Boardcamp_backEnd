import { Router } from 'express';
import categoryRouter from './categoriesRouter';

const router = Router();

router.use(categoryRouter);

export default router;