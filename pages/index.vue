<template>
	<div class="w-full flex flex-wrap h-screen items-center p-2">
		<!-- Login Section -->
		<div class="h-full w-full lg:w-1/2 flex flex-col  justify-around">
			<div class="w-full flex flex-col items-center">
				<div class="flex justify-around w-full">
					<a href="/" class="">
						<img
							src="/images/walulel_black.png"
							alt=""
							class="w-16 mb-5"
						/>
					</a>
				</div>
				<!-- flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32 -->
				<div
					class="flex flex-col w-11/12 sm:w-5/6 md:w-4/6 lg:w-3/4 xl:w-2/3"
				>
					<h1
						class="text-center text-3xl font-bold"
						:class="`text-black`"
					>
						Log in
					</h1>

					<LoginForm :urlQueries="urlQueries" />

					<Link
						:link="'/register' + urlQueries"
						mainText="Don't have an account?"
						linkText="Sign Up Here."
					/>
				</div>
			</div>
			<div
				class="flex justify-center p-1"
				:class="`text-${getUiConfig.color}`"
			>
				<div>
					<a
						:href="siteDomain + '/faqs'"
						target="_blank"
						class="_text-orange font-semibold"
						>FAQ</a
					>
				</div>
				<!-- <div class="ml-20">
					<a
						href="#"
						target="_blank"
						class="_text-orange font-semibold"
						>Help</a
					>
				</div> -->
				<div>
					<a
						:href="siteDomain + '/legal'"
						target="_blank"
						class="_text-orange ml-20 font-semibold"
						>Legal Notices</a
					>
				</div>
			</div>
		</div>
		<div
			class="_product-logo hidden lg:flex w-full h-full md:w-1/2 flex-col justify-center items-center"
		>
			<img
				:src="`/${getUiConfig.logo}`"
				class="logo mb-5"
				:class="{
					'w-3/5 xl:w-2/4': getUiConfig.logo === 'WaInsight.svg',
					'w-2/4 xl:w-2/5': getUiConfig.logo === 'WaCommunicate.svg',
					'w-1/4': getUiConfig.logo === 'IconBlack.svg',
				}"
			/>
			<p
				class="w-full md:w-2/3 text-center mt-8"
				:class="`text-${getUiConfig.color} text-lg font-semibold`"
			>
				{{ getUiConfig.caption }}
			</p>
		</div>
	</div>
</template>

<script>
import LoginForm from '~/components/LoginForm';
import Link from '~/components/common/Link';
import { mapGetters } from 'vuex';
import getCorrectDomain from '~/assets/js/getCorrectDomain';

export default {
	head() {
		return { title: 'Walulel | Login' };
	},
	middleware: ['checkLogin'],
	components: {
		LoginForm,
		Link,
	},
	asyncData({ req }) {
		let siteDomain = '';

		if (process.server) {
			siteDomain = getCorrectDomain(true, req);
		} else {
			siteDomain = getCorrectDomain(false, window);
		}

		return { siteDomain };
	},
	computed: {
		...mapGetters({
			getUiConfig: 'components/getUiConfig',
		}),
		urlQueries() {
			let url_queries = '';

			if (this.$route.query.redirect_url) {
				url_queries += `?redirect_url=${this.$route.query.redirect_url}&expect_token=true`;
			}

			return url_queries;
		},
	},
};
</script>

<style scope>
._product-logo {
	background-color: #fbfbfb;
}
</style>
