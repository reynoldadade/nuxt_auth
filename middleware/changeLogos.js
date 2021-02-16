export default ({ route }) => {
	const { redirect_url } = route.query;

	switch (redirect_url) {
		case redirect_url.includes('communicate'):
			return { color: 'wa-orange', logo: '' };

		case redirect_url.includes('wainsight'):
			return { color: 'wa-blue', logo: '' };
		default:
			break;
	}
};
