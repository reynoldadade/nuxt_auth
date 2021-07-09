export default (isServer, hostSourceObj) => {
	let domain = '';
	let host = '';

	if (isServer) {
		host = hostSourceObj.headers.host;
	} else {
		host = hostSourceObj.location.hostname;
	}

	if (/(staging\.secure|localhost|((\d{1,3}\.){3}(\d{1,3})))/.test(host)) {
		domain = 'https://staging.walulel.com';
	} else {
		domain = 'https://walulel.com';
	}

	return domain;
};
