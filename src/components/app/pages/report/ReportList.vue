<template>
    <div class="reportlist-wrapper">
        <div class="reportlist-header">
            <span>数据报表</span>
            <div class="reportlist-header-operation">
                <el-button size="small" @click="getList">刷新</el-button>
            </div>
        </div>
        <div class="reportlist-table">
            <el-table :data="reportData" style="width: 100%;" v-loading="reportLoading" :fit="true">
                <el-table-column prop="bundleId" label="Bundle ID"></el-table-column>
                <el-table-column prop="name" label="应用名称"></el-table-column>
                <el-table-column prop="installCount" label="总安装量"></el-table-column>
                <el-table-column prop="uninstallCount" label="总卸载量"></el-table-column>
                <el-table-column prop="weekInstallCount" label="近 7 天新增安装记录"></el-table-column>
                <el-table-column prop="weekUninstallCount" label="近 7 天新增卸载记录"></el-table-column>
                <el-table-column prop="monthInstallCount" label="近 30 天新增安装记录"></el-table-column>
                <el-table-column prop="monthUninstallCount" label="近 30 天新增卸载记录"></el-table-column>
            </el-table>
        </div>
        <div class="reportlist-table-pagination">
            <el-pagination id="reportListPagination" :total="total" :current-page="currentPage" :page-size="pageSize" @current-change="listCurrentChange" layout="total, prev, pager, next"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app.pages.report.reportlist',
    data(){
        return {
            reportData: [],
            reportLoading: false,
            total: 0,
            currentPage: 1,
            pageSize: 15
        }
    },
    mounted(){
        this.getList()
    },
    methods: {
        getList(){
            this.reportLoading = true
            this.axios.get('/api/app/getReport', {
                params: {
                    page: this.currentPage,
                    pageSize: this.pageSize
                }
            }).then((response) => {
                this.reportLoading = false
                if (response.status == 200 && response.data.code == 200){
                    this.total = response.data.data.total;
                    this.reportData = response.data.data.listData;
                }
            });
        },
        listCurrentChange(currentPage){
            this.currentPage = currentPage
            this.getList()
        }
    }
}
</script>

<style lang="less" scoped>
.reportlist-wrapper{
    margin: 12px 18px;
}
.reportlist-header{
    margin: 12px 0;
    height: 30px;
    user-select: none;
    -webkit-user-drag: none;
}
.reportlist-header > span {
    line-height: 30px;
    font-size: 14px;
    color: #909399;
    letter-spacing: 0.05rem;
}
.reportlist-header-operation {
    float: right;
}
.reportlist-table-pagination{
    margin-top: 16px;
}
</style>
