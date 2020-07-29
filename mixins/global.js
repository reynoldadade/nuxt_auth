export default {
	methods: {
		notify(title, type, text) {
			this.$notify({
				group: 'foo',
				type: type,
				title:
					'<b><i class="fas fa-exclamation-triangle"></i>' +
					title +
					'</b>',
				text: text,
				width: '30%',
				closeOnClick: true,
			});
		},
	},
};
