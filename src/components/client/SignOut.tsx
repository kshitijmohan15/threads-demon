"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { catchError } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

export const SignOut = ({className}:{
  className?: string
}) => {
	return (
		<Button
    className={twMerge("flex gap-2", className)}
			onClick={() => {
				try {
					signOut();
				} catch (err) {
					catchError(err);
				}
			}}
		>
			<h1>Sign Out</h1>
		</Button>
	);
};
