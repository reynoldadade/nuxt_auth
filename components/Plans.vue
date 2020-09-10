<template>
	<div class="mx-auto overflow-hidden shadow my-2 bg-white p-4">
		<div class="flex justify-between flex-wrap">
			<div>
				<p class="font-bold text-lg text-gray-700">
					{{ subscription.package_name }}
				</p>
				<p class="text-gray-500 text-sm mt-1">
					expires on
					<span class="font-bold text-gray-600">{{
						subscription.expires | momentFilter
					}}</span>
				</p>
				<p class="font-bold mt-1 text-gray-700">
					{{ subscription.consulting_duration
					}}<span class="text-xs text-gray-500"
						>/ consulting hours left</span
					>
				</p>
				<p class="font-bold mt-1 text-gray-700">
					{{ subscription.admins_remaining }}
					<span class="text-xs text-gray-500">
						/admins remaining</span
					>
				</p>
			</div>
			<div class="flex flex-col">
				<button
					class="block border-blue-500 border-2 rounded uppercase text-blue-500 p-1 m-2 hover:border-red-500 hover:text-red-500 flex-auto"
				>
					change plan
				</button>
				<a
					class="block border-green-500 border-2 rounded uppercase text-green-500 p-1 m-2 hover:border-orange-500 hover:text-orange-500 flex-auto"
					:href="appLink"
					role="button"
					target="_blank"
				>
					Go to app <i class="fas fa-external-link-alt"></i>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
export default {
	props: ['subscription'],
	data() {
		return {
			wacommURL: null,
			wainsightURL: null,
			wapatronURL: null,
			token: null,
		};
	},
	filters: {
		momentFilter: function(date) {
			return moment(date).format('YYYY-MM-DD');
		},
	},
	mounted() {
		this.token = this.$cookies.get('s_token');

		this.wacommURL = process.env.WACOMM_LINK + '/?token=' + this.token;
		this.wainsightURL =
			process.env.WAINSIGHT_LINK + '/?token=' + this.token;
	},
	computed: {
		appLink() {
			const subName = this.subscription.package_name.toLowerCase();
			if (subName.includes('wainsight')) {
				return this.wainsightURL;
			} else if (subName.includes('wacommunicate')) {
				return this.wacommURL;
			}
		},
	},
};
</script>

<style></style>
