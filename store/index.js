export const actionTypes = {
    SET_TOKEN : "setToken",
    SET_USER : "setUser",
    SET_PACKAGE : "setPackage"
 }


const state = ()=>({
    wa_temp_token : null,
    user: null,
    package:null
});

const mutations = {
    setToken(state, token){
        state.wa_temp_token =  token;
    },

    setUser(state, user){
        state.user = user
    },

    setPackage(state, pack){
        state.package =  pack;
    }
}

const actions  = {
    setToken({commit},token){
        commit(actionTypes.SET_TOKEN,token);
    },

    setUser({commit},user){
        commit(actionTypes.SET_USER, user);
    },

    setPackage({commit},pack){
        commit(actionTypes.SET_PACKAGE,pack);
    }
}

const getters = {
    user: (state)=>state.user,
    package : (state)=>state.package,
    token : (state)=>state.token
}

export {state, mutations, actions, getters }