<template>
    <el-menu
        class="nav-menu"
        default-active="1"
        :collapse="isCollapse"
        :unique-opened="false"
        mode="vertical"
    >
        <el-menu-item index="1">
            <i class="el-icon-odometer"></i>
            <span slot="title">仪表盘</span>
        </el-menu-item>
        <el-menu-item index="2">
            <i class="el-icon-s-grid"></i>
            <span slot="title">应用管理</span>
        </el-menu-item>
        <el-menu-item index="3">
            <i class="el-icon-s-marketing"></i>
            <span slot="title">数据报表</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-s-tools"></i>
            <span slot="title">用户设置</span>
        </el-menu-item>
        <el-menu-item index="5">
            <i class="el-icon-s-platform"></i>
            <span slot="title">系统管理</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    name: "app.main.Navigator",
    data() {
        return {
            isCollapse: false
        };
    }
};
</script>

<style lang="less">
.nav-menu {
    height: 100%;
}
</style>
