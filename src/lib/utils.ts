import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function catchError(err: unknown) {
	if (err instanceof z.ZodError) {
		const errors = err.issues.map((issue) => {
			return issue.message;
		});
		return toast(errors.join("\n"));
	} else if (err instanceof Error) {
		return toast.error(err.message);
	} else {
		return toast("Something went wrong, please try again later.");
	}
}
