<template>
	<div class="redirect text-center">
		<h4>Redirecting</h4>
		<div class="lds-facebook">
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
</template>

<script>
export default {
	beforeMount() {
		/**
		 * Check if user already authenticated get info and redirect away
		 *
		 */
		const {
			redirect_url,
			expect_token,
			refresh_token,
			logout,
		} = this.$route.query;
		const loginUrl = redirect_url
			? `/?redirect_url=${redirect_url}&expect_token=${expect_token}`
			: '/';

		if (logout) {
			console.log('logout here');
			this.$cookies.removeAll();
			window.localStorage.clear();
			return this.$router.push('/');
		}

		if (refresh_token) {
			return this.$router.push(loginUrl);
		}

		const access_token = this.$cookies.get('s_token');
		if (access_token) {
			/**
			 *  Redirect base on @redirct_url or @host
			 */
			//Check redirect url query availability
			if (redirect_url) {
				const outURL = `http://${redirect_url}?token=${access_token}`;
				return window.location.replace(outURL);
			}
			return this.$router.push('/profile');
		} else {
			return this.$router.push(loginUrl);
		}
	},
};
</script>

<style scoped>
.redirect {
	background: white;
	border-radius: 8px;
	height: 150px;
	width: 300px;
	margin: 15% auto 20%;
	-webkit-box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.09);
	-moz-box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.09);
	box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.09);
	padding-top: 20px;
	/* padding-left: 100px  */
}

.redirect h4 {
	margin-bottom: 5px;
}

.lds-facebook {
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;
}
.lds-facebook div {
	display: inline-block;
	position: absolute;
	left: 8px;
	width: 16px;
	background: #ef7f1a;
	animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
	left: 8px;
	animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
	left: 32px;
	animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
	left: 56px;
	animation-delay: 0;
}
@keyframes lds-facebook {
	0% {
		top: 8px;
		height: 64px;
	}
	50%,
	100% {
		top: 24px;
		height: 32px;
	}
}
</style>
