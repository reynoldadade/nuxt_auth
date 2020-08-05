function FakeUser() {
	return {
		id: 273,
		name: 'Wacommunicate Gratis',
		email: 'staging.wacommunicategratis@walulel.com',
		active: true,
		username: 'wacommunicategratis',
		phone_number: null,
		postcode: null,
		country: null,
		avatar:
			'https://walulel-photos.s3.us-east-2.amazonaws.com/avatars/profile.png',
		created_at: '2020-06-26T14:55:28.000000Z',
		permissions: [],
		roles: [],
		is_artisan: false,
		subscriptions: { wacommunicate: null, wainsight: null },
	};
}

function FakePackage() {
	return {
		id: 9,
		name: 'WaInsight Expert',
		type: 'Main',
		product: 'WaInsight',
		payment_method: null,
		valid_period: '365 days',
		pricing: {
			gb: {
				yearly: {
					currency: 'GBP',
					amount: 300000,
					stripe_plan_code: {
						test: 'price_1H9wEoIp1yD1XFOxxkQVykDE',
						live: 'price_1H8q90Ip1yD1XFOxnkTmhyAI',
					},
				},
				monthly: {
					currency: 'GBP',
					amount: 31300,
					stripe_plan_code: {
						test: 'price_1H6h4oIp1yD1XFOxvEx5Z0kq',
						live: 'price_1Gpwo5Ip1yD1XFOx2smyipcP',
					},
				},
			},
		},
		features: {
			searches: 50000,
			basket_reports: 2500,
			max_leads_radius: 6,
			admins: 4,
			consulting_duration: 12,
			datasets: 20,
		},
		sales: { cedis_payments: 0, pounds_payments: 300000 },
	};
}

export { FakeUser, FakePackage };
