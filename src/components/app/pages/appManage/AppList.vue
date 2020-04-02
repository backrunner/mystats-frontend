<template>
    <div class="applist-wrapper">
        <div class="applist-header">
            <span>应用列表</span>
            <div class="applist-header-operation">
                <el-button size="small" @click="getList">刷新</el-button>
                <el-button size="small" type="primary" @click="addAppDialog">添加</el-button>
            </div>
        </div>
        <div class="applist-table">
            <el-table :data="appListData.slice((appListCurrentPage-1)*appListSize,appListCurrentPage*appListSize)" style="width: 100%;" v-loading="appListLoading" :fit="true">
                <el-table-column prop="id" label="ID" width="75" :sortable="true"></el-table-column>
                <el-table-column prop="bundleId" label="Bundle ID" width="220"></el-table-column>
                <el-table-column prop="displayName" label="名称" width="180"></el-table-column>
                <el-table-column prop="appKey" label="App Key" width="360"></el-table-column>
                <el-table-column prop="installCount" label="总安装量" width="120"></el-table-column>
                <el-table-column prop="isEnabled" label="可用状态" :formatter="enabledFormatter" width="120"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleView(scope.$index, scope.row)">查看详情</el-button>
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="applist-table-pagination">
                <el-pagination id="appListPagination" :total="appListTotal" :current-page="appListCurrentPage" :page-size="appListSize" @current-change="appListCurrentChange" layout="total, prev, pager, next"></el-pagination>
            </div>
        </div>
        <el-dialog
            :title="appDialogTitle"
            :visible.sync="appDialogVisible"
            width="30%">
            <el-form ref="appForm" :model="appForm" :rules="appFormRule">
                <el-form-item prop="bundleId" label="Bundle ID">
                    <el-input v-model="appForm.bundleId" placeholder="com.example.app" :disabled="appFormStatus == 'edit'"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="名称">
                    <el-input v-model="appForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="desc" label="描述">
                    <el-input v-model="appForm.desc" placeholder="(可选)"></el-input>
                </el-form-item>
                <el-form-item prop="website" label="网站">
                    <el-input v-model="appForm.website" placeholder="(可选)"></el-input>
                </el-form-item>
                <el-form-item prop="appKey" label="App Key" v-show="appFormStatus == 'edit'">
                    <el-input v-model="appForm.appKey" :disabled="true"></el-input>
                    <el-popconfirm
                        title="确认要重置 App Key 吗？"
                        icon="el-icon-warning"
                        iconColor="#F56C6C"
                        confirmButtonType="danger"
                        @confirm="renewAppKey"
                    >
                        <el-button type="danger" slot="reference" size="small" id="btn-renewAppKey">重置</el-button>
                    </el-popconfirm>
                </el-form-item>
                <el-form-item prop="statUninstall" label="统计卸载量">
                    <el-switch v-model="appForm.statUninstall"></el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="appDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitAppForm" :disabled="submitEditDisabled">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "app.pages.appmanage.applist",
    data(){
        return {
            appListData: [],
            appListTotal: 0,
            appListCurrentPage: 1,
            appListSize: 10,
            appListLoading: false,
            appDialogVisible: false,
            appFormStatus: '',
            appDialogTitle: '',
            appForm: {
                id: '',
                index: '',
                bundleId: '',
                name: '',
                desc: '',
                website: '',
                appKey: '',
                statUninstall: true
            },
            appFormRule: {
                bundleId: [{
                    required: true,
                    message: 'Bundle ID 不能为空',
                    trigger: 'blur'
                }, {
                    pattern: /^\w+\.\w+.\w+$/,
                    message: 'Bundle ID 格式错误',
                    trigger: 'blur'
                }],
                name: [{
                    required: true,
                    message: '名称不能为空',
                    trigger: 'blur'
                }]
            },
            submitEditDisabled: false
        }
    },
    methods: {
        handleView(index, row){
            this.$router.push({ path: '/app/appmanage/'+row.id, params: { appId: row.id }})
        },
        handleEdit(index, row){
            this.editAppDialog(row, index)
        },
        handleDelete(index, row){
            this.$confirm('此操作将永久删除该应用 ['+row.displayName+'] 及其相关的所有数据，是否继续？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }).then(() => {
                this.deleteApp(row.id)
            }).catch(() => {
                // catch cancel
                // do nothing
            });
        },
        getList(){
            this.appListLoading = true
            this.axios.get('/api/app/getAppList').then((response) => {
                if (response.status == 200){
                    if (response.data.code == 200){
                        this.appListData = response.data.data
                        this.appListTotal = response.data.data.length
                    }
                }
                this.appListLoading = false
            });
        },
        enabledFormatter(row, column, cellValue, index){
            if (cellValue){
                return '是'
            } else {
                return '否'
            }
        },
        appListCurrentChange(currentPage){
            this.currentPage = currentPage
        },
        addAppDialog(){
            this.clearAppForm()
            this.appDialogTitle = '添加应用'
            this.appDialogVisible = true
            this.appFormStatus = 'add'
        },
        editAppDialog(row, index){
            this.appDialogTitle = '编辑应用信息'
            // 设置参数
            this.appForm.id = row.id
            this.appForm.index = index + (this.appListCurrentPage - 1) * this.appListSize
            // 填入选中应用的信息
            this.appForm.bundleId = row.bundleId
            this.appForm.name = row.displayName
            this.appForm.desc = row.description
            this.appForm.website = row.website
            this.appForm.statUninstall = row.statUninstall
            this.appForm.appKey = row.appKey
            // 打开对话框
            this.appDialogVisible = true
            this.appFormStatus = 'edit'
        },
        clearAppForm(){
            this.appForm.id = -1
            this.appForm.index = -1
            this.appForm.bundleId = ''
            this.appForm.name = ''
            this.appForm.desc = ''
            this.appForm.website = ''
            this.appForm.statUninstall = true
        },
        submitAppForm(){
            this.$refs['appForm'].validate((valid) => {
                if (!valid) {
                    return false;
                }
                if (this.appFormStatus == 'add'){
                    this.axios.post('/api/app/addApp', {
                        bundleId: this.appForm.bundleId,
                        name: this.appForm.name,
                        desc: this.appForm.desc,
                        website: this.appForm.website,
                        statUninstall: this.appForm.statUninstall
                    }).then((response) => {
                        if (response.status == 200){
                            if (response.data.code == 200){
                                this.$message.success('添加成功')
                                this.appDialogVisible = false
                            } else {
                                this.$message.error(response.data.message)
                            }
                            this.getList()
                        } else {
                            this.$message.error('网络通信错误')
                        }
                    })
                } else if (this.appFormStatus == 'edit') {
                    this.axios.post('/api/app/editApp', {
                        appId: this.appForm.id,
                        name: this.appForm.name,
                        desc: this.appForm.desc,
                        website: this.appForm.website,
                        statUninstall: this.appForm.statUninstall
                    }).then((response) => {
                        if (response.status == 200){
                            if (response.data.code == 200){
                                this.$message.success('编辑成功')
                                this.appDialogVisible = false
                            } else {
                                this.$message.error(response.data.message)
                            }
                            this.getList()
                        } else {
                            this.$message.error('网络通信错误')
                        }
                    })
                }
            });
        },
        renewAppKey(){
            this.submitEditDisabled = true
            this.axios.post('/api/app/renewAppKey', {
                appId: this.appForm.id
            }).then((response) => {
                this.submitEditDisabled = false
                if (response.status == 200){
                    if (response.data.code == 200){
                        this.$message.success('重置成功')
                        this.appForm.appKey = response.data.data
                        this.appListData[this.appForm.index].appKey = response.data.data
                    } else {
                        this.$message.error(response.data.message)
                    }
                } else {
                    this.$message.error('网络通信错误')
                }
            });
        },
        deleteApp(appId) {
            this.axios.post('/api/app/deleteApp', {
                appId: appId
            }).then((response) => {
                if (response.status == 200){
                    if (response.data.code == 200){
                        this.$message.success('删除成功')
                        this.$bus.emit('app-deleted');
                    } else {
                        this.$message.error(response.data.message)
                    }
                    this.getList()
                } else {
                    this.$message.error('网络通信错误')
                }
            });
        }
    },
    mounted() {
        // 初始化应用列表
        this.getList()
    }
};
</script>

<style lang="less" scoped>
.applist-wrapper {
    margin: 12px 18px;
}
.applist-header {
    margin: 12px 0;
    height: 30px;
    user-select: none;
    -webkit-user-drag: none;
    span {
        line-height: 30px;
        font-size: 14px;
        color: #909399;
        letter-spacing: 0.05rem;
    }
}
.applist-header-operation {
    float: right;
}
.applist-table-pagination {
    margin-top: 16px;
}
#appListPagination {
    padding: 0;
}
#btn-renewAppKey {
    margin-top: 8px;
    float: right !important;
}
</style>
