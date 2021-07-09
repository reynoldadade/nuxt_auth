export const actionTypes = {
    SET_USER : "checkout/setUser",
    SET_PACKAGE : "checkout/setPackage"
 }


const state = ()=>({
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

    setUser({commit},user){
        commit("setUser", user);
    },

    setPackage({commit},pack){
        commit("setPackage",pack);
    }
}

const getters = {
    user: (state)=>state.user,
    package : (state)=>state.package,}

export {state, mutations, actions, getters }