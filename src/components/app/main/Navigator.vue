<template>
    <el-menu
        class="nav-menu"
        :default-active="defaultActive"
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
            <el-submenu index="sub-admin">
                <template slot="title">
                    <i class="el-icon-s-platform"></i>
                    <span slot="title">系统管理</span>
                </template>
                <el-menu-item index="/app/manageuser">用户管理</el-menu-item>
                <el-menu-item index="/app/manageapp">应用管理</el-menu-item>
                <el-menu-item index="/app/announcement">公告管理</el-menu-item>
            </el-submenu>
        </template>
    </el-menu>
</template>

<script>
export default {
    name: "app.main.Navigator",
    data() {
        return {
            isCollapse: false,
            showAdmin: this.$store.state.userinfo.role == 'admin'
        };
    },
    created() {
        this.$bus.on("menu-status-changed", this.menuStatusChanged);
    },
    watch: {
        "$store.state.userinfo.role": 'canShowAdmin'
    },
    computed: {
        defaultActive() {
            if (this.$route.path == '/app'){
                return '/app/dashboard';
            } else {
                return /(\/[a-zA-Z]+\/[a-zA-Z]+)/.exec(this.$route.path).length > 0 ? /(\/[a-zA-Z]+\/[a-zA-Z]+)/.exec(this.$route.path)[0] : null
            }
        }
    },
    methods: {
        menuStatusChanged(status) {
            this.isCollapse = status;
        },
        canShowAdmin(){
            if (this.$store.state.userinfo.role == 'admin'){
                this.showAdmin = true
            } else {
                this.showAdmin = false
            }
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
    user-select: none;
    -webkit-user-drag: none;
}
.nav-menu:not(.el-menu--collapse) {
    width: 200px;
}
</style>
