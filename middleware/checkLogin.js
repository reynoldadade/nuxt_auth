export default ({ app, env, route, redirect }) => {
	const redirectAuthUrl = '';
	const token = app.$cookies.get('token');
	if (token) {
		return redirect('/profile');
	} else {
		return redirect('/');
	}
};
