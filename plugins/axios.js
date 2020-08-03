let defaultHeaders = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

export default function({ $axios, redirect, $cookies }) {
	const token = $cookies.get('token');

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
				case 401:
					return redirect('/');
				case 404:
					return redirect('/404');

				default:
					break;
			}
		} else {
			console.log({ error });
		}
	});

	$axios.setBaseURL(process.env.WACOMM_API_ENDPOINT);
	// $axios.setBaseURL('http://bf9b3997d389.ngrok.io/');
}
