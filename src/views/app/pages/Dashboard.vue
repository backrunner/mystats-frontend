<template>
    <div class="appview appview-dashboard">
        <div class="dashboard-wrapper">
            <el-row class="row-overview">
                <el-col :span="6">
                    <OverviewCard icon="el-icon-box" label="应用数" :value="appCount"></OverviewCard>
                </el-col>
                <el-col :span="6">
                    <OverviewCard icon="el-icon-s-grid" label="版本数" :value="versionCount"></OverviewCard>
                </el-col>
                <el-col :span="6">
                    <OverviewCard icon="el-icon-pie-chart" label="安装记录数" :value="installCount"></OverviewCard>
                </el-col>
                <el-col :span="6">
                    <OverviewCard icon="el-icon-delete" label="卸载记录数" :value="uninstallCount"></OverviewCard>
                </el-col>
            </el-row>
            <el-row class="row-main">
                <el-col :span="10">
                    <el-row class="row-shadow row-fall row-announcement" v-if="latestAnnouncement && latestAnnouncement.length > 0">
                        <el-col :span="24">
                            <div class="announcement-header">
                                <span>最新公告<i class="el-icon-message-solid" style="margin-left: 8px;"></i></span>
                            </div>
                            <div class="announcement">
                                <span v-html="latestAnnouncement"></span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="row-shadow row-fall row-chart">
                        <div class="chart-wrapper">
                            <div class="chart-header">
                                <span>近 30 天增量概览</span>
                            </div>
                            <div class="chart">
                                <ve-line :data="increaseData" :settings="increaseChartSettings" :colors="['#f1b50e', '#f56c6c']" height="340px"></ve-line>
                            </div>
                        </div>
                    </el-row>
                </el-col>
                <el-col :span="14">
                    <el-row class="row-shadow row-fall row-chart">
                        <div class="chart-wrapper">
                            <div class="chart-header">
                                <span>应用统计概览</span>
                            </div>
                            <div class="chart chart-stat" v-if="appStatData.rows.length > 0">
                                <ve-bar :data="appStatData" :settings="appStatChartSettings" :colors="['#f1b50e', '#f56c6c']" height="560px"></ve-bar>
                            </div>
                            <div class="chart-nodata" v-else>
                                <div class="chart-nodata-text">
                                    <span>暂无应用数据</span>
                                </div>
                            </div>
                        </div>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import OverviewCard from "@/components/app/basic/OverviewCard.vue";

export default {
    name: 'app.page.dashboard',
    components: {
        OverviewCard
    },
    data(){
        return {
            appCount: 0,
            versionCount: 0,
            installCount: 0,
            uninstallCount: 0,
            latestAnnouncement: '',
            appStatChartSettings: {
                labelMap: {
                    name: '应用名称',
                    installCount: '安装量',
                    uninstallCount: '卸载量'
                }
            },
            appStatData: {
                columns: ['name', 'installCount', 'uninstallCount'],
                rows: []
            },
            increaseChartSettings: {
                labelMap: {
                    date: '日期',
                    installCount: '安装记录数',
                    uninstallCount: '卸载记录数'
                }
            },
            increaseData: {
                columns: ['date', 'installCount', 'uninstallCount'],
                rows: []
            }
        }
    },
    mounted() {
        this.getOverview()
        this.getAnnouncement()
        this.getAppStatData()
        this.getIncreaseData()
    },
    methods: {
        getOverview(){
            this.axios.get('/api/app/getDashboardOverview').then((response) => {
                this.installCount = response.data.data.installCount
                this.uninstallCount = response.data.data.uninstallCount
                this.appCount = response.data.data.appCount
                this.versionCount = response.data.data.versionCount
            })
        },
        getAnnouncement(){
            this.axios.get('/api/app/getLatestAnnouncement').then((response) => {
                if (response.status == 200 && response.data.code == 200){
                    this.latestAnnouncement = response.data.data.content.replace(/\n/g, '<br>');
                }
            })
        },
        getAppStatData(){
            this.axios.get('/api/app/getAppStatData').then((response) => {
                if (response.status == 200 && response.data.code == 200){
                    this.appStatData.rows = response.data.data
                }
            });
        },
        getIncreaseData(){
            this.axios.get('/api/app/getIncreaseData').then((response)=>{
                if (response.status == 200){
                    if (response.data.code == 200){
                        let statInstallData = response.data.data.install;
                        let statUninstallData = response.data.data.uninstall;
                        let time = this.dayjs.subtract(30, 'days');
                        for (let i=0;i<30;i++){
                            let formatted = time.format('YYYY-M-D');
                            let object = {
                                date: formatted
                            }
                            if (statInstallData.hasOwnProperty(formatted)){
                                object['installCount'] = statInstallData[formatted]
                            } else {
                                object['installCount'] = 0
                            }
                            if (statUninstallData.hasOwnProperty(formatted)){
                                object['uninstallCount'] = statUninstallData[formatted]
                            } else {
                                object['uninstallCount'] = 0
                            }
                            this.increaseData.rows.push(object)
                            time = time.add(1, 'days')
                        }
                    }
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.appview {
    margin: 1.25rem;
}
.box-card {
    margin: 0 8px;
    box-shadow: 0 0px 8px rgba(0, 0, 0, 0.05) !important;
    user-select: none;
    -webkit-user-drag: none;
}
.row-shadow{
    border: 1px solid #EBEEF5;
    border-radius: 4px;
    box-shadow: 0 0px 8px rgba(0, 0, 0, 0.05) !important;
}
.row-fall {
    margin: 14px 8px 0 8px;
    padding: 16px;
}
.announcement-header{
    user-select: none;
    -webkit-user-drag: none;
}
.announcement-header > span {
    color: #909399;
    font-size: 14px;
}
.announcement{
    margin-top: 14px;
    color: #606266;
    font-size: 15px;
    user-select: none;
    line-height: 28px;
    -webkit-user-drag: none;
}
.chart-wrapper {
    padding: 0 8px;
}
.chart-header > span {
    color: #909399;
    font-size: 14px;
    line-height: 32px;
}
.chart{
    height: 300px;
}
.chart-nodata {
    padding: 32px 28px;
}
.chart-nodata-text {
    width: max-content;
    margin: 0 auto;
    font-size: 14px;
    color: #909399;
    letter-spacing: 0.05em;
    user-select: none;
    -webkit-user-drag: none;
}
.chart-stat{
    height: 532px;
}
</style>
