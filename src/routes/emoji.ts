import { Router } from 'express';
import * as EmojiHandlers from '../handlers/emoji';

type EmojiResponse = string[];

const routes: Router = Router();

routes.get<{}, EmojiResponse>('/', EmojiHandlers.getEmojis);

export default routes;
