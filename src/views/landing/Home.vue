<template>
    <el-container>
        <el-main>
            <Header></Header>
            <Main></Main>
        </el-main>
        <el-footer>
            <Footer></Footer>
        </el-footer>
    </el-container>
</template>

<script>
import Header from '@/components/landing/home/Header.vue'
import Main from '@/components/landing/home/Main.vue'
import Footer from '@/components/common/Footer.vue'

export default {
    name: 'landing.home',
    components: {
        Header,
        Main,
        Footer
    }
}
</script>

<style lang="less">
html, body, .el-container{
    height: 100%;
}
body{
    margin: 0;
}
.el-main{
    overflow-x: hidden;
}
.el-footer{
    height: 80px !important;
}
</style>