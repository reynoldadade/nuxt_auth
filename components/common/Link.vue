<template>
	<div class="text-center py-5">
		<p>
			{{ mainText }}
			<nuxt-link :to="link" class="underline font-semibold">{{
				linkText
			}}</nuxt-link>
		</p>
	</div>
</template>

<script>
export default {
	props: ['link', 'mainText', 'linkText'],
};
</script>

<style></style>
