<template>
    <div class="annolist-wrapper">
        <div class="annolist-header">
            <span>公告列表</span>
            <div class="annolist-header-operation">
                <el-button size="small" @click="getList">刷新</el-button>
                <el-button size="small" type="primary" @click="addAnnoDialog">添加</el-button>
            </div>
        </div>
        <div class="anno-table">
            <el-table :data="annoData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%;" v-loading="annoLoading" :fit="true">
                <el-table-column prop="id" label="ID" width="100"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
                <el-table-column prop="lastUpdateTime" label="更新时间" width="180"></el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="annolist-table-pagination">
                <el-pagination id="annoListPagination" :total="total" :current-page="currentPage" :page-size="pageSize" @current-change="listCurrentChange" layout="total, prev, pager, next"></el-pagination>
            </div>
        </div>
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form ref="annoForm" :model="annoForm" :rules="annoFormRule">
                <el-form-item prop="desc" label="描述">
                    <el-input v-model="annoForm.desc"></el-input>
                </el-form-item>
                <el-form-item prop="content" label="内容">
                    <el-input type="textarea" style="min-height: 150px;" v-model="annoForm.content"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitAnno" :disabled="submitAnnoDisabled">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'app.pages.admin.announcementlist',
    data() {
        return {
            annoData: [],
            currentPage: 1,
            pageSize: 10,
            annoLoading: false,
            total: 0,
            // 表单
            dialogTitle: '',
            dialogVisible: false,
            submitAnnoDisabled: false,
            annoFormStatus: '',
            annoForm: {
                id: '',
                desc: '',
                content: ''
            },
            annoFormRule: {
                desc: [{
                    required: true,
                    message: '描述不能为空',
                    trigger: 'blur'
                }],
                content: [{
                    required: true,
                    message: '内容不能为空',
                    trigger: 'blur'
                }]
            }
        }
    },
    mounted(){
        this.getList()
    },
    methods: {
        getList(){
            this.annoLoading = true
            this.axios.get('/api/admin/getAnnouncementList').then((response) => {
                if (response.status == 200){
                    if (response.data.code == 200){
                        this.annoData = response.data.data
                        this.total = response.data.data.length
                    }
                }
                this.annoLoading = false
            });
        },
        handleEdit(index, row){
            this.editAnnoDialog(row)
        },
        handleDelete(index, row){
            this.$confirm('此操作将永久删除该公告，是否继续？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }).then(() => {
                this.deleteAnno(row.id)
            }).catch(() => {
                // catch cancel
                // do nothing
            });
        },
        clearAnnoForm(){
            this.annoForm.id = -1
            this.annoForm.desc = ''
            this.annoForm.content = ''
        },
        addAnnoDialog(){
            this.dialogTitle = '添加公告'
            this.annoFormStatus = 'add'
            this.clearAnnoForm()
            this.dialogVisible = true
        },
        editAnnoDialog(row){
            this.dialogTitle = '编辑公告'
            this.annoFormStatus = 'edit'
            this.clearAnnoForm()
            this.annoForm.id = row.id
            this.annoForm.desc = row.description
            this.annoForm.content = row.content
            this.dialogVisible = true
        },
        listCurrentChange(currentPage){
            this.currentPage = currentPage
        },
        submitAnno(){
            this.$refs['annoForm'].validate((valid) => {
                if (!valid) {
                    return false;
                }
                this.submitAnnoDisabled = true;
                if (this.annoFormStatus == 'add'){
                    this.axios.post('/api/admin/addAnnouncement', {
                        desc: this.annoForm.desc,
                        content: this.annoForm.content
                    }).then((response) => {
                        this.submitAnnoDisabled = false;
                        if (response.status == 200){
                            if (response.data.code == 200){
                                this.$message.success('添加成功')
                                this.dialogVisible = false
                            } else {
                                this.$mesage.error(response.data.message)
                            }
                            this.getList()
                        } else {
                            this.$message.error('网络通信错误')
                        }
                    });
                } else if (this.annoFormStatus == 'edit'){
                    this.axios.post('/api/admin/updateAnnouncement', {
                        id: this.annoForm.id,
                        desc: this.annoForm.desc,
                        content: this.annoForm.content
                    }).then((response) => {
                        this.submitAnnoDisabled = false;
                        if (response.status == 200){
                            if (response.data.code == 200){
                                this.$message.success('编辑成功')
                                this.dialogVisible = false
                            } else {
                                this.$message.error(response.data.message)
                            }
                            this.getList()
                        } else {
                            this.$message.error('网络通信错误')
                        }
                    });
                }
            });
        },
        deleteAnno(id){
            this.axios.post('/api/admin/deleteAnnouncement', {
                id: id
            }).then((response) => {
                if (response.status == 200){
                    if (response.data.code == 200){
                        this.$message.success('删除成功')
                    } else {
                        this.$message.error(response.data.message)
                    }
                    this.getList()
                } else {
                    this.$message.error('网络通信错误')
                }
            });
        }
    }
}
</script>

<style lang="less" scoped>
.annolist-wrapper {
    margin: 12px 18px;
}
.annolist-header {
    margin: 12px 0;
    height: 30px;
    user-select: none;
    -webkit-user-drag: none;
}
.annolist-header > span {
    line-height: 30px;
    font-size: 14px;
    color: #909399;
    letter-spacing: 0.05rem;
}
.annolist-header-operation {
    float: right;
}
.annolist-table-pagination{
    margin-top: 16px;
}
</style>
