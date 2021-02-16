export default ({ route, store }) => {
	const { redirect_url } = route.query;

	switch (redirect_url) {
		case redirect_url.includes('communicate'):
			return store.dispatch('components/setUiConfig', {
				color: 'wa-orange',
				logo: 'WaCommunicate.svg',
				caption:
					'WaCommunicate is a social network designed for the neighbourhood community',
			});

		case redirect_url.includes('wainsight'):
			return store.dispatch('components/setUiConfig', {
				color: 'wa-blue',
				logo: 'WaInsight.svg',
				caption:
					'WaInsight enables residential Real Estate market participants to understand the quality of every neighbourhood, postcode or zip code.',
			});
		default:
			return store.dispatch('components/setUiConfig', {
				color: 'black',
				logo: 'IconBlack.svg',
				caption:
					'WaInsight enables residential Real Estate market participants to understand the quality of every neighbourhood, postcode or zip code.',
			});
	}
};
