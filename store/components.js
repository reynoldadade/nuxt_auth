const store = () => ({
	uiConfig: {},
});

const mutations = {
	setUiConfig(state, payload) {
		state.uiConfig = payload;
	},
};

const actions = {
	setUiConfig({ commit }, payload) {
		commit('setUiConfig', payload);
	},
};

const getters = {
	getUiConfig: state => state.uiConfig,
};

export { store, getters, actions, mutations };
