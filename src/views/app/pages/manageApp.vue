<template>
    <div class="appview">
        <div class="list-wrapper">
            <el-row class="row-shadow row-list">
                <el-col :span="24">
                    <ApplicationList></ApplicationList>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import ApplicationList from '@/components/app/pages/admin/ApplicationList.vue';

export default {
    name: 'app.page.manageUser',
    components: {
        ApplicationList
    },
    watch: {
        '$store.state.userinfo.role': 'adminCheck'
    },
    methods: {
        adminCheck(){
            if (this.$store.state.userinfo.role != 'admin'){
                this.$router.push({
                    name: 'error.404'
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.appview {
    margin: 1.25rem;
}
.row-shadow{
    border: 1px solid #EBEEF5;
    border-radius: 4px;
    box-shadow: 0 0px 8px rgba(0, 0, 0, 0.05) !important;
}
</style>
