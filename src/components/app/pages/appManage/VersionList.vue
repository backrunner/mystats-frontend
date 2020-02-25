<template>
    <div class="versionlist-wrapper">
        <div class="versionlist-header">
            <span>应用版本列表</span>
            <div class="versionlist-header-operation">
                <el-button size="small" @click="getList">刷新</el-button>
            </div>
        </div>
        <div class="versionlist-table">
            <el-table
                :data="versionListData"
                style="width: 100%;"
                v-loading="versionListLoading"
                :fit="true"
            >
                <el-table-column prop="id" label="ID" width="100"></el-table-column>
                <el-table-column prop="branch" label="分支" width="100"></el-table-column>
                <el-table-column prop="version" label="版本"></el-table-column>
                <el-table-column prop="installCount" label="安装量"></el-table-column>
                <el-table-column prop="uninstallCount" label="卸载量"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="versionlist-table-pagination">
            <el-pagination id="versionListPagination" :total="total" :current-page="currentPage" :page-size="pageSize" @current-change="currentChange" layout="total, prev, pager, next"></el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    name: 'app.pages.appmanage.versionList',
    props: ['appId'],
    data(){
        return {
            versionListData: [],
            pageSize: 15,
            currentPage: 1,
            total: 0,
            versionListLoading: false
        }
    },
    mounted(){
        this.getList()
    },
    watch: {
        appId: 'getList'
    },
    methods: {
        handleDelete(row, index){
            this.$confirm('此操作将永久删除该分支 ['+row.branch+'] 下的版本 ['+row.version+'] 及其相关的所有数据，是否继续？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }).then(() => {
                this.deleteVersion(row.id)
            }).catch(() => {
                // catch cancel
                // do nothing
            });
        },
        getList(){
            this.versionListLoading = true;
            this.axios.get('/api/app/getVersionList', {
                params: {
                    appId: this.appId,
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                }
            }).then((response) => {
                this.versionListLoading = false;
                if (response.status == 200){
                    if (response.data.code == 200){
                        this.versionListData = response.data.data.list
                        this.total = response.data.data.total
                    } else {
                        this.versionListData = [];
                        this.total = 0;
                    }
                } else {
                    this.versionListData = [];
                }
            });
        },
        deleteVersion(versionId) {
            this.axios.post('/api/app/deleteVersion', {
                appId: this.appId,
                versionId: versionId
            }).then((response) => {
                if (response.status == 200){
                    if (response.data.code == 200){
                        this.$message.success('删除成功')
                    } else {
                        this.$message.error(response.data.message)
                    }
                    this.getList()
                    this.$bus.emit('version-deleted');
                } else {
                    this.$message.error('网络通信错误')
                }
            });
        },
        currentChange(currentPage){
            this.currentPage = currentPage
            this.getList()
        }
    }
}
</script>
<style lang="less" scoped>
.versionlist-wrapper {
    padding: 12px 20px;
    span {
        color: #909399;
        font-size: 14px;
        line-height: 32px;
    }
}
.versionlist-header-operation {
    float: right;
}
.versionlist-table-pagination{
    margin-top: 16px;
}
#versionListPagination{
    padding: 0;
}
</style>
