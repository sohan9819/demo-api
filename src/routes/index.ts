import { Router } from 'express';
import TodoRoutes from './todo';
import EmojiRoutes from './emoji';

const router: Router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/todo', TodoRoutes);
router.use('/emoji', EmojiRoutes);

export default router;
