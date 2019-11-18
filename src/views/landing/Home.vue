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

<style lang="less" scoped>
.el-main{
    overflow-x: hidden;
}
</style>