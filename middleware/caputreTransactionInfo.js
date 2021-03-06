export default function({ app, route }) {
	const { package_id, payment_type, referrer, run_id } = route.query;
	console.log(route.query);

	if (package_id && payment_type) {
		app.$cookies.set(
			'_package_',
			{ package_id, payment_type },
			{
				path: '/',
				maxAge: 3600,
				sameSite: 'none',
				secure: true,
			}
		);
	}

	//save referrer
	saveReferrer(app.$cookies, referrer);

	if (referrer == 'wapatron') {
		saveRun(app.$cookies, run_id);
	}
}

function saveReferrer($cookies, referrer) {
	if (referrer) {
		$cookies.set('_referrer_', referrer, {
			path: '/',
			maxAge: 3600,
			sameSite: 'none',
			secure: true,
		});
	}
}

function saveRun($cookies, run_id) {
	if (run_id) {
		$cookies.set('_run_id_', run_id, {
			path: '/',
			maxAge: 3600,
			sameSite: 'none',
			secure: true,
		});
	}
}
