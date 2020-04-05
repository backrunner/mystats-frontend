<template>
    <el-card class="box-card card-number">
        <div class="card-number-data">
            <div class="card-number-label">
                <span>{{label}}</span>
            </div>
            <div class="card-number-value">
                <span>{{value}}</span>
            </div>
        </div>
    </el-card>
</template>

<script>
export default {
    name: "app.basic.numberCard",
    props: ['label', 'value'],
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
@card-number-height: 100px;
.card-number-label{
    color: #909399;
    letter-spacing: 0.05rem;
    font-size: 14px;
    margin-bottom: 6px;
}
.card-number-value{
    color: #606266;
    font-size: 26px;
    font-family: "Nunito";
    font-weight: 700;
    margin-top: 0px;
}
.card-number{
    height: @card-number-height;
}
.card-number-data{
    margin: auto 6px;
}
</style>
