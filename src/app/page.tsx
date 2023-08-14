import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
	const session = await getAuthSession();
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Link href={"/sign-in"}>
				<Button>Sign In</Button>
			</Link>
			<pre>{JSON.stringify(session, null, 2)}</pre>
		</main>
	);
}
