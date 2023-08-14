import UserAuthForm from "@/components/UserAuthForm";

const SignIn = () => {
	return (
		<div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
			<UserAuthForm />
		</div>
	);
};

export default SignIn;
