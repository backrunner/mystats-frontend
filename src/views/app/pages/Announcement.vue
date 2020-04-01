<template>
    <div class="appview appview-announcement">
        <div class="announcement-wrapper">
            <el-row class="row-shadow row-appList">
                <el-col :span="24">
                    <AnnouncementList></AnnouncementList>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import AnnouncementList from '@/components/app/pages/admin/AnnouncementList.vue';
export default {
    name: 'app.page.announcement',
    components: {
        AnnouncementList
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
