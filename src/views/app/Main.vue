<template>
    <el-container>
        <el-aside class="nav">
            <Navigator></Navigator>
        </el-aside>
        <el-container>
            <el-main class="main-container">
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
    }
};
</script>
<style lang="less">
html, body, .el-container{
    height: 100%;
}
body{
    margin: 0;
}
.nav{
    width: 220px !important;
}
.nav-collapse{
    width: max-content !important;
}
.main-container{
    padding: 0;
}
</style>
