"use server";
import { db } from "@/db";
import { v4 as uuidv4 } from "uuid";
import { getAuthSession } from "@/lib/auth";
import { addThreadsSchema } from "@/validations/thread";
import { z } from "zod";
import { Thread, threads } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { and, eq, inArray, isNull, not } from "drizzle-orm";
import { get } from "http";
export async function addThreadsAction(
	input: z.infer<typeof addThreadsSchema>
) {
	const session = await getAuthSession();
	if (!session) return Error("Not logged in");
	const uuids = getUuidsFromLength(input.threads.length);
	type ThreadNew = Omit<Thread, "createdAt">;
	const result_threads: Omit<ThreadNew[], "created_at"> = [];
	input.threads.forEach((thread, i) => {
		result_threads.push({
			id: uuids[i],
			text: thread.text,
			userId: session.user.id,
			parentId: uuids[i - 1] || null,
			dialogue_id: thread.dialogueId,
		});
	});
	console.log(result_threads);
	await db.insert(threads).values(result_threads);
	revalidatePath("/");
}

function getUuidsFromLength(length: number) {
	return Array.from({ length }, () => uuidv4());
}

export async function getFeedAction() {
	const results = await db.query.threads.findMany({
		where: isNull(threads.parentId),
		with: {
			user: {
				columns: {
					username: true,
					image: true,
					id: true,
				},
			},
		},
	});
	return results;
}
export async function getDialogueForThread(id: string) {
	const thread = await db.query.threads.findFirst({
		where: eq(threads.id, id),
		with: {
			user: {
				columns: {
					id: true,
					username: true,
					image: true,
				},
			},
		},
	});
	if (!thread) throw Error("No thread found");
	const dialogue_id = thread?.dialogue_id;
	if (!dialogue_id) throw new Error("No dialogue id found");
	const dialogue = await db.query.threads.findMany({
		where: and(
			eq(threads.dialogue_id, dialogue_id),
			not(eq(threads.id, id))
		),
		with: {
			user: {
				columns: {
					id: true,
					username: true,
					image: true,
				},
			},
		},
	});

	const ordered_threads = [thread];

	const parentId_to_thread = new Map<string, typeof thread>();

	dialogue.forEach((thread) => {
		parentId_to_thread.set(thread.parentId!, thread);
	});

	let current_thread_parent_id = thread.id;
	while (current_thread_parent_id) {
		const current_thread = parentId_to_thread.get(current_thread_parent_id);
		if (!current_thread) break;
		ordered_threads.push(current_thread);
		parentId_to_thread.delete(current_thread_parent_id);
		current_thread_parent_id = current_thread.id;
	}
	return ordered_threads;
}
export const deleteThreadAction = async (id: string) => {
	const session = await getAuthSession();
	if (!session) return Error("Not logged in");
	const dialogue = await getDialogueForThread(id);
	await db.delete(threads).where(
		inArray(
			threads.id,
			dialogue.map((t) => t.id)
		)
	);
	revalidatePath("/");
	revalidatePath(`/dialogue/${id}`);
};
