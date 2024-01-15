import { Response, Request } from 'express';

export const getEmojis = (req: Request, res: Response) => {
  res.json(['😀', '😳', '🙄']);
};
