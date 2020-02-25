<template>
    <el-container>
        <el-main :class="displayFooter ? '' : 'no-footer'">
            <Header></Header>
            <Main></Main>
            <Footer v-if="displayFooter"></Footer>
        </el-main>
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
    },
    data(){
        return {
            displayFooter: true
        }
    },
    mounted(){
        addEventListener('resize',()=>{
            this.windowResize();
        })
        this.windowResize()
    },
    methods: {
        windowResize(){
            if (document.documentElement.clientWidth > 768){
                this.displayFooter = true
            } else {
                this.displayFooter = false
            }
        }
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
.no-footer{
    padding-bottom: 40px !important;
}
</style>
