import { z } from 'zod';

const TodoSchema = z.object({
  title: z.string().nullable(),
  status: z.boolean().default(false),
});

type TodoSchema = z.infer<typeof TodoSchema>;

export default TodoSchema;
