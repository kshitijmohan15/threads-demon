import { z } from "zod";

export const addThreadSchema = z.object({
	text: z.string().min(1, "Write a tweet bro").nonempty(),
	dialogueId: z.string(),
});
export const addThreadsSchema = z.object({
	threads: z.array(addThreadSchema),
});
