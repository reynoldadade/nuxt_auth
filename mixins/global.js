export default {
	methods: {
		notify(settings) {
			const { title, type, text } = settings;
			this.$notify({
				group: 'foo',
				type: type,
				title: '<b>' + title + '<b/>',
				text: text,
				width: '50%',
				closeOnClick: true,
			});
		},
	},
};
