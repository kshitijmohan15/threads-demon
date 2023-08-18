"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Thread, User } from "@/db/schema";
import { deleteThreadAction } from "@/app/_actions/thread";

export const ThreadList = ({
	thread_data,
}: {
	thread_data: (Thread & { user: Pick<User, "username" | "image" | "id"> })[];
}) => {
	return (
		<div className="flex flex-col w-full">
			<AnimatePresence>
				{thread_data.map((thread) => (
					<motion.div
						key={thread.id}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 1 }}
						layout
					>
						<Card className="rounded-none flex justify-between relative">
							<Link href={`/dialogue/${thread.id}`}>
								<CardHeader>
									<div className="text-lg">
										{thread.user.username?.toLowerCase()}
									</div>
									<p className="text-lg">{thread.text}</p>
								</CardHeader>
							</Link>
							<div className="h-full flex items-center absolute top-0 bottom-0 right-0">
								<Button
									onClick={() => {
										deleteThreadAction(thread.id);
									}}
									variant={"ghost"}
									className="mr-4"
								>
									<Trash></Trash>
								</Button>
							</div>
						</Card>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
};
