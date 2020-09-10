export default function({ $axios, store, app, redirect, route }) {
	let profile = store.getters['user/getProfile'];
	const user_id = app.$cookies.get('USER_ID');
	let userToken = app.$cookies.get('s_token');

	// if (user_id != undefined) {
	// 	store.dispatch('app/setUserID', user_id);
	// }
	if (profile == undefined || profile == null) {
		profile = app.$cookies.get('auth-profile');
	}

	if (profile != undefined) {
		store.dispatch('user/storeProfile', profile);
		return;
	}
	if (userToken == undefined || userToken == null) {
		if (route.query.token) {
			userToken = route.query.token;
			app.$cookies.remove('s_token');
			app.$cookies.set('s_token', userToken, {
				maxAge: 604800,
				path: '/',
				sameSite: true,
			});
		}
	}

	return $axios({
		url: '/user/profile',
		method: 'get',
		headers: {
			Authorization: `Bearer ${app.$cookies.get('s_token')}`,
		},
	}).then(
		({ data }) => {
			//return array of subscriptions
			const subscriptions = Object.values(data.data.subscriptions).filter(
				item => item != null
			);

			// if (env.APP_URL == 'wa-communicate.com' && window.mixpanel != undefined) {
			// if (window.mixpanel != undefined) {
			// 	window.mixpanel.identify(data.data.email);
			// 	window.mixpanel.people.set({
			// 		$email: data.data.email,
			// 		$name: data.data.name,
			// 		Product: 'WaInsight',
			// 	});
			// }
			// store.dispatch('app/setUserID', data.data.id);
			app.$cookies.set('user_id', data.data.id, {
				maxAge: 604800,
				path: '/',
				sameSite: true,
			});
			//check subscription

			// const subscription = data.data.subscriptions.wainsight
			// 	? data.data.subscriptions.wainsight.subscription
			// 	: null;
			//set subscriptions in vuex store
			// store.dispatch('app/setUserSubscription', subscription);
			const {
				name,
				email,
				phone_number,
				avatar,
				id,
				active,
				username,
				postcode,
				country,
			} = data.data;
			const profile = {
				name,
				email,
				phone_number,
				avatar,
				id,
				active,
				username,
				postcode,
				country,
				subscriptions,
			};
			store.dispatch('user/storeProfile', profile);
			app.$cookies.set('auth-profile', profile, {
				path: '/',
				sameSite: true,
			});
			return true;
		},
		error => {
			console.log(error);
			app.$cookies.remove('s_token');
			// const redirectAuthURL = `${env.LOGIN_URL}?redirect_url=${env.APP_URL}${route.path}&expect_token=true&refresh_token=true`;
			return redirect('/');
		}

		//redirect to wa-insight
		//redirect to patron
		//redirect to wacomm
		//based on subscription
	);
}
