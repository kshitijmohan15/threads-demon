import { getDialogueForThread } from "@/app/_actions/thread";
import { RepliesComponent } from "@/components/client/RepliesComponent";
import Image from "next/image";

const page = async ({
	params,
}: {
	params: {
		id: string;
	};
}) => {
	const threads_data = await getDialogueForThread(params.id);
	const main_thread = threads_data[0];
	const replies = threads_data.slice(1);
	return (
		<div>
			<div>
				<div className="flex flex-col gap-4 items-start pt-6 px-4 h-32">
					<div className="flex gap-3 items-center">
						<Image
							className="rounded-full w-8 h-8"
							width={50}
							height={50}
							alt="profile_pic"
							src={
								main_thread?.user?.image ??
								"https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg"
							}
						/>
						<p className="text-sm font-semibold">
							@{main_thread?.user?.username}
						</p>
					</div>
					<div>
						<p className="text-lg">{main_thread?.text}</p>
					</div>
				</div>
			</div>
			{replies.length > 1 && (
				<div className="flex flex-col border-y-[1px] py-4">
					{replies.map((message, index) => {
						return (
							<RepliesComponent
								index={index}
								length={replies.length}
								key={message.id}
								id={message.id}
								username={message.user.username ?? ""}
								image={
									message.user.image ??
									"https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg"
								}
								text={message.text}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default page;
