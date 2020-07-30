export default ({ app, env, route, redirect }) => {
	const redirectAuthUrl = '';
	const token = app.$cookies.get('token');
	if (token) {
		//   TODO: redirect to packages page if token exists in
		// return redirect('/');
	}
};
