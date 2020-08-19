export const state = () => ({
	user: [],
	profile: null,
	userPermissions: [],
});

export const mutations = {
	storePermissions: (state, data) => {
		state.userPermissions = data;
	},
	storeProfile: (state, data) => {
		state.profile = data;
	},
};

export const actions = {
	storePermissions({ commit }, data) {
		commit('storePermissions', data);
	},
	storeProfile({ commit }, data) {
		commit('storeProfile', data);
	},
};

export const getters = {
	getPermissions: state => state.userPermissions,
	getProfile: state => state.profile,
};
