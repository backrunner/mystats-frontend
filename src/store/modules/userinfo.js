const state = {
    username: '',
    email: '',
    phone: '',
    avatar: '',
}

const mutations = {
    setUserInfo (state, userinfo){
        state.username = userinfo.username;
        state.email = userinfo.email
        state.phone = userinfo.phone
        state.avatar = userinfo.avatar
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
    setAvatar (state, avatar){
        state.avatar = avatar
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
