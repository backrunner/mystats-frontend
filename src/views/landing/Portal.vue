<template>
    <el-container>
        <el-aside width="360px" class="side-panel">
            <SidePanel></SidePanel>
        </el-aside>
        <el-container>
            <el-main class="main">

            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import SidePanel from '@/components/landing/portal/SidePanel.vue'

export default {
    name: 'landing.portal',
    components: {
        SidePanel
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
.side-panel{
    padding: 2.5rem;
    box-shadow: 0 2px 1.75rem 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
}
.main{
    padding: 0;
}
</style>