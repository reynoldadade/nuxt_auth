<template>
	<div class="w-full flex flex-wrap h-screen items-center p-2">
		<!-- Login Section -->
		<div class="h-full w-1/2 flex flex-col justify-around">
			<div class="w-full flex flex-col items-center">
				<div class="flex justify-around w-full">
					<a href="#" class="">
						<img
							src="~assets/images/walulel_black.png"
							alt=""
							class="h-12 w-12"
						/>
					</a>
				</div>

				<div class="flex flex-col w-2/3">
					<p class="text-center text-3xl text-black">Login</p>
					<LoginForm />

					<Link
						link="/register"
						mainText="Don't have an account?"
						linkText="Sign Up Here."
					/>
				</div>
			</div>
			<div class="flex justify-around p-1">
				<div>FAQ</div>
				<div>Help</div>
				<div>Legal Notices</div>
			</div>
		</div>
		<div class="xs:hidden md:w-1/2 flex justify-around">
			<object type="image/svg+xml" data="/WaCommunicate.svg" class="logo">
				404 logo
				<!-- fallback image in CSS -->
				<style>
					.logo {
						width: 50%;
						height: 100%;
					}
				</style>
			</object>
		</div>
	</div>
</template>

<script>
import LoginForm from '~/components/LoginForm';
import Link from '~/components/common/Link';
export default {
	head() {
		return { title: 'Walulel | Login' };
	},
	middleware: ['checkLogin'],
	components: {
		LoginForm,
		Link,
	},
};
</script>

<style></style>
