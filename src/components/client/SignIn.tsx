"use client";

import { catchError, cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import * as React from "react";
import { FC } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

interface SignInWithGoogleProps extends React.HTMLAttributes<HTMLDivElement> {}

const SignIn: FC<SignInWithGoogleProps> = ({ className, ...props }) => {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const loginWithGoogle = async () => {
		setIsLoading(true);

		try {
			await signIn("google");
		} catch (error) {
			catchError(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cn("flex justify-center", className)} {...props}>
			<Button
				type="button"
				className="flex gap-2"
				onClick={loginWithGoogle}
				disabled={isLoading}
			>
				<FcGoogle className="text-lg" />
				<p className="md:block hidden">Google</p>
			</Button>
		</div>
	);
};

export default SignIn;
