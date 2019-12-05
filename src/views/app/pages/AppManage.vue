<template>
    <div class="appview appview-usersettings">
        <div class="appmanage-wrapper" v-if="!isDetailPage">
            <el-row class="row-overview">
                <el-col :span="8">
                    <OverviewCard icon="el-icon-box" label="应用总数" :value="totalAppCount"></OverviewCard>
                </el-col>
                <el-col :span="8">
                    <OverviewCard icon="el-icon-pie-chart" label="一周内新增安装数" :value="recentInstallCount"></OverviewCard>
                </el-col>
                <el-col :span="8">
                    <OverviewCard icon="el-icon-delete" label="一周内新增卸载数" :value="recentUninstallCount"></OverviewCard>
                </el-col>
            </el-row>
            <el-row class="row-appList">
                <el-col :span="24">
                    <AppList></AppList>
                </el-col>
            </el-row>
        </div>
        <router-view v-else></router-view>
    </div>
</template>

<script>
import OverviewCard from "@/components/app/basic/OverviewCard.vue";
import AppList from "@/components/app/pages/appManage/AppList.vue";

export default {
    name: "app.page.appmanage",
    components: {
        OverviewCard,
        AppList
    },
    data() {
        return {
            totalAppCount: 0,
            recentInstallCount: 0,
            recentUninstallCount: 0,
            isDetailPage: this.$route.matched.length == 3
        };
    },
    watch: {
        $route() {
            if (this.$route.matched.length == 3) {
                this.isDetailPage = true;
            } else {
                this.isDetailPage = false;
            }
        }
    },
    mounted() {
        // 获取概览数据
        this.axios.get("/api/app/userOverview").then(response => {
            if (response.status == 200) {
                this.totalAppCount = response.data.data.totalAppCount;
                this.recentInstallCount = response.data.data.recentInstallCount;
                this.recentUninstallCount =
                    response.data.data.recentUninstallCount;
            }
        });
    }
};
</script>

<style lang="less" scoped>
.appview {
    margin: 1.25rem;
}

.row-appList {
    margin: 16px 8px;
    box-shadow: 0 0px 8px rgba(0, 0, 0, 0.075) !important;
}
</style>
