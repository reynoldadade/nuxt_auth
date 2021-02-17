export default ({ route, store }) => {
	const { redirect_url } = route.query;

	if (redirect_url) {
		if (redirect_url.includes('communicate')) {
			return store.dispatch('components/setUiConfig', {
				color: 'wa-orange',
				logo: 'WaCommunicate.svg',
				caption:
					'WaCommunicate is a social network designed for the neighbourhood community',
			});
		} else if (redirect_url.includes('insight')) {
			return store.dispatch('components/setUiConfig', {
				color: 'wa-blue',
				logo: 'WaInsight.svg',
				caption:
					'WaInsight enables residential Real Estate market participants to understand the quality of every neighbourhood, postcode or zip code.',
			});
		} else {
			store.dispatch('components/setUiConfig', {
				color: 'black',
				logo: 'IconBlack.svg',
				caption:
					'WaInsight enables residential Real Estate market participants to understand the quality of every neighbourhood, postcode or zip code.',
			});
		}
	} else {
		store.dispatch('components/setUiConfig', {
			color: 'black',
			logo: 'IconBlack.svg',
			caption:
				'WaInsight enables residential Real Estate market participants to understand the quality of every neighbourhood, postcode or zip code.',
		});
	}
};
