<template>
    <div class="appview appview-report">
        <div class="report-wrapper">
            <el-row class="row-shadow row-appList">
                <el-col :span="24">
                    <ReportList></ReportList>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import ReportList from '@/components/app/pages/report/ReportList.vue'

export default {
    name: 'app.page.report',
    components: {
        ReportList
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
