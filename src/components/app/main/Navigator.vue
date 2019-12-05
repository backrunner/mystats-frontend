<template>
    <el-menu
        class="nav-menu"
        :default-active="/(\/[a-z]+\/[a-z]+)/.exec(this.$route.path)[0]"
        :collapse="isCollapse"
        :unique-opened="false"
        mode="vertical"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
    >
        <el-menu-item index="/app/dashboard">
            <i class="el-icon-odometer"></i>
            <span slot="title">仪表盘</span>
        </el-menu-item>
        <el-menu-item index="/app/appmanage">
            <i class="el-icon-s-grid"></i>
            <span slot="title">应用管理</span>
        </el-menu-item>
        <el-menu-item index="/app/report">
            <i class="el-icon-s-marketing"></i>
            <span slot="title">数据报表</span>
        </el-menu-item>
        <el-menu-item index="/app/usersettings">
            <i class="el-icon-s-tools"></i>
            <span slot="title">用户设置</span>
        </el-menu-item>
        <template v-if="showAdmin">
            <el-menu-item index="/app/admin">
                <i class="el-icon-s-platform"></i>
                <span slot="title">系统管理</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script>
export default {
    name: "app.main.Navigator",
    data() {
        return {
            isCollapse: false,
            showAdmin: false
        };
    },
    created() {
        this.$bus.on("menu-status-changed", this.menuStatusChanged);
    },
    methods: {
        menuStatusChanged(status) {
            this.isCollapse = status;
        }
    }
};
</script>

<style lang="less" scoped>
span {
    font-weight: 500;
}
.nav-menu {
    height: 100%;
}
.nav-menu:not(.el-menu--collapse) {
    width: 200px;
}
</style>
