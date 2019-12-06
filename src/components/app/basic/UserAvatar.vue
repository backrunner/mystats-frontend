<template>
    <div class="user-avatar-wrapper">
        <el-dropdown trigger="click" @command="handleCommand">
            <el-avatar class="user-avatar" :size="size" :src="avatarUrl"></el-avatar>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="user-settings">用户设置</el-dropdown-item>
                <el-dropdown-item command="logout">登出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import Encryption from '@/utils/encryption.js'
export default {
    name: "app.basic.userAvatar",
    props: ['size'],
    computed: {
        avatarUrl(){
            return this.getAvatarUrl();
        }
    },
    methods: {
        getAvatarUrl(){
            if (typeof this.$store.state.userinfo.email == 'undefined' || this.$store.state.userinfo.email == null || this.$store.state.userinfo.email.length < 1){
                return "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            } else {
                let email_hash = Encryption.md5(this.$store.state.userinfo.email);
                return 'https://www.gravatar.com/avatar/'+email_hash+'?s='+this.size
            }
        },
        handleCommand(command) {
            if (command == 'user-settings'){
                if (this.$route.name != 'app.page.userSettings'){
                    this.$router.push({
                        name: 'app.page.userSettings'
                    })
                }
            } else if (command == "logout") {
                this.doLogout();
            }
        },
        doLogout() {
            this.axios.get("/api/portal/logout").then(response => {
                if (response.status != 200) {
                    this.$message.error("请求时出现错误");
                    return;
                }
                if (response.data.code != 200) {
                    this.$message.error(response.data.message);
                    return;
                } else {
                    this.$router.push({
                        name: "landing.portal"
                    });
                }
            });
        }
    }
};
</script>

<style lang="less">
li {
    font-weight: 500
}
.user-avatar-wrapper {
    height: 56px;
}
.user-avatar-wrapper > .el-dropdown {
    height: 56px;
}
.user-avatar:hover{
    cursor: pointer;
}
.el-avatar {
    margin: 12px 16px;
}
</style>
