<template>
    <el-container>
        <el-aside class="nav">
            <Navigator></Navigator>
        </el-aside>
        <el-container>
            <el-main class="container-main">
                <MainPart></MainPart>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import Navigator from '@/components/app/main/Navigator.vue'
import MainPart from '@/components/app/main/MainPart.vue'

export default {
    name: "app.main",
    components: {
        Navigator,
        MainPart
    },
    created(){
        // 拉取用户的基本信息
        this.axios.get('/api/user/fetchUserInfo').then((response) => {
            if (response.status == 200){
                if (typeof response.data.data.username != 'undefined'){
                    this.$store.commit('userinfo/setUsername', response.data.data.username)
                }
            }
        });
    },
    mounted(){
        if(this.$route.name == 'app.main'){
            this.$router.push({
                name: 'app.page.dashboard'
            })
        }
    },
    data() {
        return {
            menuCollapsed: false
        }
    }
};
</script>
<style lang="less" scoped>
html, body, .el-container{
    height: 100%;
}
body{
    margin: 0;
}
.nav{
    width: max-content !important;
}
.container-main{
    padding: 0;
}
</style>
