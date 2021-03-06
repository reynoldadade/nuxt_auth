let defaultHeaders = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

export default function({ $axios, redirect, $cookies }) {
	const token = $cookies.get('s_token');

	$axios.onRequest(({ headers }) => {
		if (token) {
			defaultHeaders = {
				...defaultHeaders,
				Authorization: `Bearer ${token}`,
			};
			headers.common = { ...headers.common, ...defaultHeaders };
		}
	});
	$axios.onError(error => {
		if (error.response) {
			switch (error.response.status) {
				// case 401:
					// return redirect('/');
				case 404:
					return redirect('/404');

				default:
					break;
			}
		} else {
			console.log({ error });
		}
	});
}
