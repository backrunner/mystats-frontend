<template>
    <div class="detail-view">
        <el-row class="row-overview">
            <el-col :span="24">
                <el-card class="box-card card-info">
                    <div class="info-name">
                        <span class="info-name-display">{{name}}</span>
                        <span class="info-name-bundle">{{bundleId}}</span>
                        <span class="info-name-appkey">App Key: <span class="appkey-value appkey-value-hidden" v-if="appKeyStatus == 'hidden'">****************************************</span><span v-else class="appkey-value">{{appKey}}</span>
                            <i id="icon-appKey-view" @click="appKeyStatus == 'hidden'?appKeyStatus = 'display' : appKeyStatus = 'hidden'" class="el-icon-view"></i>
                        </span>
                        <div class="info-name-disabled" v-if="!appEnabled">
                            <span>不可用</span>
                        </div>
                    </div>
                    <div class="info-desc" v-if="desc.length > 0">
                        <span class="info-desc">{{desc}}</span>
                    </div>
                    <div class="info-website" v-if="desc.website > 0">
                        <a class="info-website" :href="website">{{website}}</a>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="row-version">
            <el-col :span="8">
                <el-row>
                    <el-col :span="24">
                        <NumberCard label="总安装量" :value="installCount" style="margin-top: 14px"></NumberCard>
                        <NumberCard label="总卸载量" v-if="statUninstall" :value="uninstallCount" style="margin-top: 14px"></NumberCard>
                    </el-col>
                </el-row>
                <el-row class="row-shadow row-table row-current-version" style="margin-top: 14px">
                    <el-col :span="24">
                        <CurrentVersionList :data="currentVersionData"></CurrentVersionList>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="16">
                <el-row class="row-shadow row-table row-version" style="margin-top: 14px">
                    <el-col :span="24">
                        <div class="linechart-wrapper">
                            <div class="linechart-header">
                                <span>近 30 天安装量</span>
                            </div>
                            <div class="linechart">
                                <ve-line :data="monthInstallCountData" :settings="monthInstallCountSettings" :colors="['#f1b50e']" height="280px"></ve-line>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="row-shadow row-table row-version" style="margin-top: 14px">
                    <el-col :span="24">
                        <VersionList :appId="$route.params.appId"></VersionList>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import CurrentVersionList from '@/components/app/pages/appManage/CurrentVersionList.vue'
import VersionList from '@/components/app/pages/appManage/VersionList.vue'
import NumberCard from "@/components/app/basic/NumberCard.vue";

export default {
    name: 'app.page.appManage.appDetail',
    components: {
        CurrentVersionList,
        VersionList,
        NumberCard
    },
    data() {
        return {
            name: '',
            bundleId: '',
            desc: '',
            website: '',
            appKey: '',
            appKeyStatus: 'hidden',
            appEnabled: true,
            currentVersionData: [],
            statUninstall: true,
            installCount: 0,
            uninstallCount: 0,
            monthInstallCountSettings: {
                labelMap: {
                    date: '日期',
                    installCount: '安装量'
                }
            },
            monthInstallCountData: {
                columns: ['date', 'installCount'],
                rows: []
            }
        }
    },
    watch: {
        '$route': 'getData'
    },
    created(){
        this.$bus.on('version-deleted', this.getInfo);
    },
    mounted(){
        this.getData()
    },
    methods: {
        getData(){
            this.getInfo()
            this.getChartData()
        },
        getInfo(){
            this.axios.get('/api/app/fetchInfo', {
                params:{
                    appId: this.$route.params.appId
                }
            }).then((response) => {
                if (response.status == 200){
                    if (response.data.code == 200){
                        this.name = response.data.data.displayName
                        this.bundleId = response.data.data.bundleId
                        this.desc = response.data.data.description
                        this.website = response.data.data.website
                        this.appKey = response.data.data.appKey
                        this.statUninstall = response.data.data.statUninstall
                        this.installCount = response.data.data.installCount
                        this.uninstallCount = response.data.data.uninstallCount
                        this.appEnabled = response.data.data.isEnabled
                        // 当前版本信息的转换
                        this.currentVersionData = []
                        for (var c in response.data.data.currentVersion){
                            this.currentVersionData.push({
                                branch: c,
                                version: response.data.data.currentVersion[c]
                            })
                        }
                    } else {
                        this.$router.push({
                            name: 'error.404'
                        });
                    }
                }
            });
        },
        getChartData(){
            this.axios.get('/api/app/monthInstallCount', {
                params:{
                    appId: this.$route.params.appId
                }
            }).then((response) => {
                if (response.status == 200){
                    if (response.data.code == 200){
                        let installData = response.data.data;
                        let time = this.dayjs().subtract(30, 'days');
                        for (let i=0;i<30;i++){
                            let formatted = time.format('YYYY-M-D');
                            if (installData.hasOwnProperty(formatted)){
                                this.monthInstallCountData.rows.push({
                                    date: formatted,
                                    installCount: installData[formatted]
                                })
                            } else {
                                this.monthInstallCountData.rows.push({
                                    date: formatted,
                                    installCount: 0
                                })
                            }
                            time = time.add(1, 'days')
                        }
                    }
                }
            });
        }
    }
}
</script>
<style lang="less" scoped>
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
.info-name-display {
    font-size: 28px;
    color: #606266;
    font-weight: 600 !important;
    letter-spacing: 0.05rem;
}
.info-name-bundle {
    font-size: 14px;
    color: #909399;
    margin-left: 12px;
    letter-spacing: 0.05rem;
}
.info-name-appkey {
    font-size: 14px;
    color: #909399;
    margin-left: 12px;
}
.info-name-appkey > i {
    color: #909399;
    margin-left: 8px;
}
.info-desc {
    font-size: 14px;
    margin-top: 8px;
    color: #909399;
    letter-spacing: 0.05rem;
}
.info-website {
    font-size: 14px;
    margin-top: 8px;
    color: #909399;
    letter-spacing: 0.05rem;
}
.info-website > a:hover{
    color: #f1b50e;
}
.info-name-disabled {
    float: right;
    background: #F56C6C;
    border-radius: 4px;
    font-size: 12px;
    color: white;
    margin: 3px 0;
    padding: 4px 8px;
}
.row-table{
    margin: 0 8px;
}
#icon-appKey-view{
    transition: 200ms;
}
#icon-appKey-view:hover{
    color: #f1b50e;
    cursor: pointer;
}
.appkey-value{
    user-select: text;
    font-family: consolas;
}
.appkey-value-hidden {
    font-family: consolas;
}
// chart
.linechart-wrapper {
    padding: 12px 20px;
}
.linechart-header > span {
    color: #909399;
    font-size: 14px;
    line-height: 32px;
}
.linechart{
    height: 240px;
}
</style>
