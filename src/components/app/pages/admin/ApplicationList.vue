<template>
    <div class="list-wrapper">
        <div class="list-header">
            <span>用户列表</span>
            <div class="list-header-operation">
                <el-button size="small" @click="getList">刷新</el-button>
            </div>
        </div>
        <div class="list-table">
            <el-table :data="listData" style="width: 100%;" v-loading="listLoading" :fit="true">
                <el-table-column prop="id" label="ID" width="85"></el-table-column>
                <el-table-column prop="bundleId" label="Bundle ID"></el-table-column>
                <el-table-column prop="displayName" label="名称" width="200"></el-table-column>
                <el-table-column prop="website" label="网站"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
                <el-table-column prop="lastUpdateTime" label="最后更新时间" width="180"></el-table-column>
                <el-table-column prop="installCount" label="安装量" width="100"></el-table-column>
                <el-table-column prop="uninstallCount" label="卸载量" width="100"></el-table-column>
                <el-table-column prop="enabled" label="可用状态" :formatter="enabledFormatter" width="120"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger"  v-if="scope.row.enabled" @click="handleBan(scope.$index, scope.row)">封禁</el-button>
                        <el-button size="mini" type="primary"  v-if="!scope.row.enabled" @click="handleUnban(scope.$index, scope.row)">解封</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="list-table-pagination">
            <el-pagination :total="total" :current-page="currentPage" :page-size="pageSize" @current-change="listCurrentChange" layout="total, prev, pager, next"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app.pages.admin.userlist',
    data(){
        return {
            listData: [],
            currentPage: 1,
            pageSize: 10,
            listLoading: false,
            total: 0,
            currentPage: 1,
            pageSize: 20
        }
    },
    mounted(){
        this.getList()
    },
    methods: {
        handleBan(index, row){
            this.$confirm('此操作将禁用应用 ['+row.displayName+']，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.post('/api/admin/banApp', {
                    appId: row.id
                }).then((response) => {
                    if (response.status != 200){
                        this.$message.error('网络通信错误')
                        return
                    }
                    if (response.data.code != 200){
                        this.$message.error(response.data.message)
                        return
                    }
                    this.$message.success('封禁成功')
                    this.getList()
                })
            }).catch(() => {
                // catch cancel
                // do nothing
            });
        },
        handleUnban(index, row){
            this.$confirm('此操作将解封应用 ['+row.displayName+']，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.post('/api/admin/unbanApp', {
                    appId: row.id
                }).then((response) => {
                    if (response.status != 200){
                        this.$message.error('网络通信错误')
                        return
                    }
                    if (response.data.code != 200){
                        this.$message.error(response.data.message)
                        return
                    }
                    this.$message.success('解封成功')
                    this.getList()
                })
            }).catch(() => {
                // catch cancel
                // do nothing
            });
        },
        handleDelete(index, row){
            this.$confirm('此操作将永久删除应用 ['+row.displayName+']，且数据不可恢复，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }).then(() => {
                this.axios.post('/api/admin/deleteApp', {
                    appId: row.id
                }).then((response) => {
                    if (response.status != 200){
                        this.$message.error('网络通信错误')
                        return
                    }
                    if (response.data.code != 200){
                        this.$message.error(response.data.message)
                        return
                    }
                    this.$message.success('删除成功')
                    this.getList()
                })
            }).catch(() => {
                // catch cancel
                // do nothing
            });
        },
        getList(){
            this.listLoading = true
            this.axios.get('/api/admin/getApplicationList', {
                params: {
                    page: this.currentPage,
                    pageSize: this.pageSize
                }
            }).then((response) => {
                this.listLoading = false
                if (response.status == 200 && response.data.code == 200){
                    this.total = response.data.data.total
                    this.listData = response.data.data.list
                }
            });
        },
        listCurrentChange(currentPage){
            this.currentPage = currentPage
            this.getList()
        },
        enabledFormatter(row, column, cellValue, index){
            if (cellValue){
                return '是'
            } else {
                return '否'
            }
        }
    }
}
</script>

<style lang="less" scoped>
.list-wrapper {
    margin: 12px 18px;
}
.list-header {
    margin: 12px 0;
    height: 30px;
    user-select: none;
    -webkit-user-drag: none;
}
.list-header > span {
    line-height: 30px;
    font-size: 14px;
    color: #909399;
    letter-spacing: 0.05rem;
}
.list-header-operation {
    float: right;
}
.list-table-pagination{
    margin-top: 16px;
}
</style>
