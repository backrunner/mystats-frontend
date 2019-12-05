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
                if (response.data.data != null){
                    this.$store.commit('userinfo/setUserInfo', response.data.data)
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
<style lang="less">
// 复写 el-dialog 的样式
.el-dialog__body{
    padding: 4px 18px;
}
.el-dialog__body > .el-form > .el-form-item{
    margin-bottom: 8px;
}
// 复写 el-popconfirm 的样式
.el-popconfirm__main{
    margin: 8px 0;
}
.el-popconfirm__action{
    float: right;
}
</style>
