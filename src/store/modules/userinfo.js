const state = {
    username: null,
    email: null,
    phone: null,
    role: null
}

const mutations = {
    setUserInfo (state, userinfo){
        state.username = userinfo.username
        state.email = userinfo.email
        state.phone = userinfo.phone
        state.role = userinfo.role
    },
    setUsername (state, username){
        state.username = username
    },
    setEmail (state, email){
        state.email = email
    },
    setPhone (state, phone){
        state.phone = phone
    },
    setRole (state, role){
        state.role = role
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
