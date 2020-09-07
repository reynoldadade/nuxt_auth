export default ({ app, env, route, redirect }) => {
	const redirectAuthUrl = '';
	const { redirect_url } = route.query;
	if (!redirect_url) {
		const token = app.$cookies.get('s_token');
		if (token) {
			if (route.path !== '/profile')
				return window.location.replace(
					env.WALULEL_LINK + '/products?token=' + token
				);
		} else {
			if (route.path !== '/') {
				return redirect('/');
			} else {
				console.log('/');
			}
		}
	}
};
