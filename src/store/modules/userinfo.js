const state = {
    username: '',
    userEmail: '',
    userPhone: '',
    userAvatar: '',
}

const mutations = {
    setUserInfo (state, userinfo){
        state.username = userinfo.username;
        state.userEmail = userinfo.email
        state.userPhone = userinfo.phone
        state.userAvatar = userinfo.avatar
    },
    setUsername (state, username){
        state.username = username
    },
    setEmail (state, email){
        state.userEmail = email
    },
    setPhone (state, phone){
        state.userPhone = phone
    },
    setAvatar (state, avatar){
        state.userAvatar = avatar
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
