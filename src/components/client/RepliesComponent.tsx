"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { User } from "@/db/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { catchError } from "@/lib/utils";
import { Trash } from "lucide-react";
import { deleteThreadAction } from "@/app/_actions/thread";
// import { createReplyAction } from "@/app/_actions/thread";
const RepliesComponent = ({
	text,
	image,
	username,
	id,
	index,
	length,
}: {
	text: string;
	image: string;
	id: string;
	username: string;
	length: number;
	index: number;
}) => {
	return (
		<Card className="border-none py-2 px-4 flex gap-4 hover:bg-slate-50 hover:dark:bg-slate-900 rounded-none transition-colors duration-100">
			<Link href={`/dialogue/${id}`} className="relative">
				<div className="z-50">
					<Image
						className="rounded-full w-8 h-8 "
						width={50}
						height={50}
						alt="profile_pic"
						src={
							image ??
							"https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg"
						}
					/>
					{!(index === 0) ? (
						<div className="-z-10 absolute top-0 left-8 w-[2px] h-1/2 bg-gray-200 dark:bg-gray-700"></div>
					) : null}
					{index !== length - 1 ? (
						<div className="-z-10 absolute bottom-0 left-8 w-[2px] h-1/2 bg-gray-200 dark:bg-gray-700"></div>
					) : null}
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex gap-4 items-center font-semibold text-sm">
						@{username}
					</div>
					<div className="flex flex-col">{text}</div>
				</div>
			</Link>
			<Button
				onClick={async () => {
					try {
						await deleteThreadAction(id);
					} catch (error) {
						catchError(error);
					}
				}}
				className="absolute right-4"
				variant={"ghost"}
			>
				<Trash></Trash>
			</Button>
		</Card>
	);
};

export { RepliesComponent };
