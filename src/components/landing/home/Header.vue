<template>
    <div class="landing-header">
        <el-row class="row-logo">
            <el-col :span="24">
                <img id="logo" src="@/assets/logo_256.png" />
            </el-col>
            <el-col :span="24">
                <div class="title">
                    <span>myStats</span>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="desc">
                    <span>简单、易用的安装量统计</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'landing.home.header'
}
</script>

<style lang="less" scoped>
span{
    color: #606266;
    font-weight: 500;
    user-select: none;
    -webkit-user-drag: none;
}
.row-logo {
    text-align: center;
    padding-top: 2.5rem;
}
#logo{
    width: 8.75rem;
    user-select: none;
    -webkit-user-drag: none;
}
.title{
    padding: 1.5rem;
    font-size: 2rem;
    letter-spacing: 0.1rem;
    color: #303133 !important;
}
.desc{
    font-size: 1.375rem;
    letter-spacing: 0.075rem;
}
@media (max-width: 1600px){
    #logo{
        width: 7.75rem;
    }
    .title{
        padding: 1rem;
        font-size: 1.75rem;
    }
    .row-logo {
        padding-top: 1rem;
    }
}
@media (max-width: 768px) {
    #logo{
        width: 6.5rem;
    }
    .row-logo {
        padding-top: 2rem;
    }
}
</style>

