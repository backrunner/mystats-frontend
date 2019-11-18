<template>
    <div class="landing-header">
        <el-row class="row-logo">
            <el-col :span="24">
                <img id="logo" src="@/assets/logo_256.png" />
            </el-col>
            <el-col :span="24">
                <div class="title">
                    <span>myStatics</span>
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

<style lang="less" scoped>
span{
    color: #303133;
}
.row-logo {
    text-align: center;
    padding-top: 2.75rem;
}
#logo{
    width: 10rem;
}
.title{
    padding: 1.5rem;
    font-size: 2rem;
    letter-spacing: 0.075rem;
}
.desc{
    font-size: 1.375rem;
    letter-spacing: 0.05rem;
}
@media (max-width: 768px) {
    #logo{
        width: 8.5rem;
    }
    .row-logo {
        padding-top: 2.5rem;
    }
}
</style>

