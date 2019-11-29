<template>
    <div class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in levelList" :key="item.path" :to="item.path">{{item.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: "app.basic.breadcrumb",
    data() {
        return {
            levelList: []
        };
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        }
    },
    created() {
        this.getBreadcrumb()
    },
    methods: {
        getBreadcrumb() {
            this.levelList = this.$route.matched.splice(1, 1)
        }
    }
};
</script>

<style lang="less">
span {
    font-weight: 500 !important
}
</style>
