import { getAuthSession } from "@/lib/auth";
import SignIn from "./client/SignIn";
import { SignOut } from "./client/SignOut";

export const Sidebar = async () => {
	const session = await getAuthSession();
	return (
		<div className="flex flex-col">
			<div className="p-4 w-full justify-center">
				{!session ? (
					<SignIn className="" />
				) : (
					<SignOut className="w-1/2" />
				)}
			</div>
		</div>
	);
};
