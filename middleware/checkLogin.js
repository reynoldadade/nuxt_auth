export default ({ app, env, route, redirect }) => {
	const redirectAuthUrl = '';
	const { redirect_url, expect_token, refresh_token, logout } = route.query;

	if (!redirect_url) {
		const token = app.$cookies.get('token');
		if (token) {
			return redirect('/profile');
		} else {
			return redirect('/');
		}
	}
};
