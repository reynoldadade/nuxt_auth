import getCorrectDomain from '../assets/js/getCorrectDomain';

export default ({ req, app, env, route, redirect }) => {
	const { redirect_url } = route.query;
	if (!redirect_url) {
		const token = app.$cookies.get('s_token');
		if (token) {
			const redirectDestination = getRedirectDestination(req);

			if (route.path !== '/profile')
				return window.location.replace(
					`${redirectDestination}?token=${token}`
				);
		} else {
			if (route.path !== '/') {
				app.$cookies.removeAll();
				return redirect('/');
			}
		}
	}
};

function getRedirectDestination(req) {
	let domain = '';
	let redirectDestination = '';

	if (process.server) {
		domain = getCorrectDomain(true, req);
	} else {
		domain = getCorrectDomain(false, window);
	}

	if (domain === 'https://staging.walulel.com') {
		redirectDestination = `https://staging.wa-communicate.com/`;
	} else {
		redirectDestination = `https://wa-communicate.com/`;
	}

	return redirectDestination;
}
