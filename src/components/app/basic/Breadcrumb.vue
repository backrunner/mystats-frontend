<template>
    <div class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <template v-for="item in levelList">
                <el-breadcrumb-item v-if="item.path != '/app'" :key="item.path" :to="item.path">{{item.meta.title}}</el-breadcrumb-item>
            </template>
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
            this.levelList = this.$route.matched
            // 导航到正确的地方
            this.levelList.forEach(route=>{
                if (route.meta.paramName){
                    route.path = route.path.replace(':'+route.meta.paramName, this.$route.params[route.meta.paramName])
                }
            });
        }
    }
};
</script>

<style lang="less">
span {
    font-weight: 500 !important
}
</style>
