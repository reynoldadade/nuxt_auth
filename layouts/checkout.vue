<template>
	<nuxt />
</template>

<script>
export default {
    name: 'checkout-layout',
    
    head() {
		return {
			title: 'Secure Checkout | Walulel Company Limited',
			link: [
				{
					href:
						'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap',
					rel: 'stylesheet',
				},
				{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
			],
			
		};
    },
    
    middleware: ['caputreTransactionInfo', 'captureToken']
};
</script>