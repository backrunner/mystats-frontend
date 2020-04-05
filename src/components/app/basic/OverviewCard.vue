<template>
    <el-card class="box-card card-overview">
        <div class="overview-iconwrapper">
            <i :class="iconClass"></i>
        </div>
        <div class="overview-data">
            <div class="overview-data-label">
                <span>{{label}}</span>
            </div>
            <div class="overview-data-value">
                <span>{{value}}</span>
            </div>
        </div>
    </el-card>
</template>

<script>
export default {
    name: "app.basic.overviewCard",
    props: ['icon', 'label', 'value'],
    data(){
        return {
            iconClass: this.icon
        }
    }
};
</script>

<style lang="less" scoped>
.box-card {
    margin: 0 8px;
    box-shadow: 0 0px 8px rgba(0, 0, 0, 0.05) !important;
    user-select: none;
    -webkit-user-drag: none;
}
</style>

<style lang="less">
@overview-height: 100px;
.overview-data-label{
    color: #909399;
    letter-spacing: 0.05rem;
    margin-bottom: 4px;
    font-size: 14px;
}
.overview-data-value{
    color: #606266;
    font-size: 26px;
    font-family: "Nunito";
    font-weight: 700;
    margin-top: 0px;
}
.card-overview{
    height: @overview-height;
}
.card-overview > .el-card__body{
    display: flex;
    flex-direction: row;
    padding: 0;
}
.overview-iconwrapper{
    display: flex;
    align-content: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    background: #f1b50e;
    color: white;
    font-size: 28px;
    margin: 18px;
    border-radius: 4px;
    box-shadow: 0 0px 4px lighten(#f1b50e, 25%);
}
.overview-iconwrapper > i{
    margin: auto;
    font-weight: 500;
}
.overview-data{
    flex: 1 1 auto;
    display: inline-block;
    margin: auto 6px;
}
</style>
