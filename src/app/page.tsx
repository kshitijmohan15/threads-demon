import { AddThreadForm } from "@/components/client/AddThreadForm";
import { AuthAlert } from "@/components/client/AuthAlert";
import { Thread, User } from "@/db/schema";
import { getAuthSession } from "@/lib/auth";
import { getFeedAction } from "./_actions/thread";
import { ThreadList } from "@/components/client/ThreadList";
export default async function Home() {
	const session = await getAuthSession();
	const thread_data = await getFeedAction();
	return (
		<main className="flex min-h-screen flex-col items-center justify-start">
			{/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
			<AddThreadForm session={session}></AddThreadForm>
			<AuthAlert session={session}></AuthAlert>
			<ThreadList thread_data={thread_data}></ThreadList>
		</main>
	);
}
