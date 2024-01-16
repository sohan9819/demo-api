import { z } from 'zod';

const TodoSchema = z.object({
  title: z.string().min(3),
  status: z.boolean().default(false),
});

type TodoSchema = z.infer<typeof TodoSchema>;

export default TodoSchema;
