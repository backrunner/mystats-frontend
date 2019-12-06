<template>
    <div class="currentversion-wrapper">
        <div class="currentversion-header">
            <span>当前版本列表</span>
        </div>
        <div class="currentversion-table">
            <el-table :data="data" style="width: 100%;" :fit="true">
                <el-table-column prop="branch" label="分支" width="180"></el-table-column>
                <el-table-column prop="version" label="当前版本"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'app.pages.appmanage.currentversionlist',
    props: ['data']
}
</script>
<style lang="less" scoped>
.currentversion-wrapper {
    padding: 20px;
    color: #909399;
    font-size: 14px;
}
</style>
