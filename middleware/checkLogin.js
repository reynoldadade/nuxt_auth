import getCorrectDomain from '../assets/js/getCorrectDomain';
import getDestinationAfterRegister from '~/assets/js/getDestinationAfterRegister';

export default ({ req, app, env, route, redirect }) => {
	const { redirect_url } = route.query;
	if (!redirect_url) {
		const token = app.$cookies.get('s_token');
		if (token) {
			const redirectDestination = getRedirectDestination(
				req,
				app.$cookies.get('interested_products')
			);

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

function getRedirectDestination(req, products) {
	let domain = '';
	let redirectDestination = '';

	if (process.server) {
		domain = getCorrectDomain(true, req);
	} else {
		domain = getCorrectDomain(false, window);
	}

	const isStaging = domain === 'https://staging.walulel.com';

	redirectDestination = getDestinationAfterRegister(isStaging, products);

	return redirectDestination;
}
