
<template>
	<div class="h-screen w-screen bg-white flex items-center justify-center text-center">
        <div class="p-8 rounded bg-gray-200 border">
            <h3 class="text-2xl text-gray-700 font-semibold">Transaction Completed!</h3>
            <p class="text-sm text-gray-600">This page will be redirected automatically after 5 seconds</p>
        </div>
    </div>
</template>


<script>
export default {
    name: 'checkout-success',
    layout: 'checkout',
	computed: {
		url() {
            const {refer} = this.$route.query;
            let url = process.env.WALULEL_LINK;
			switch (refer) {
				case 'wapatron':
					return url = process.env.WAPATRON_LINK + '/offers';
				case 'wacommunicate':
					return url = process.env.WACOMM_LINK;
				case 'waartisan':
					return url = process.env.WAARTISAN_LINK;
				case 'wainsight':
					return url =  process.env.WAINSIGHT_LINK;
				
            }
            return url;
		},
	},

	mounted() {
		setTimeout(() => {
			window.location.replace(this.url);
		}, 5000);
	},
};
</script>


<style scoped>
*,
body {
	font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
		'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
		'Helvetica Neue', sans-serif;
}

html {
	font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
		'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	font-size: 16px;
	word-spacing: 1px;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
}
</style>