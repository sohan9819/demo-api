import { z } from 'zod';

const ParamsWithId = z.string().uuid();
type ParamsWithId = z.infer<typeof ParamsWithId>;

export default ParamsWithId;
