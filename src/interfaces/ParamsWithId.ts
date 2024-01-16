import { z } from 'zod';

const ParamsWithId = z.object({
  id: z.string().uuid(),
});
type ParamsWithId = z.infer<typeof ParamsWithId>;

export default ParamsWithId;
