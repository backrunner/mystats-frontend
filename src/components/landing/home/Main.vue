<template>
    <div class="landing-main">
        <div class="control-wrapper">
            <el-row class="row-start">
                <el-col :span="24">
                    <el-button type="primary" id="btn-start" round @click="goLogin()">开始使用</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="card-wrapper">
            <el-row class="row-cards">
                <el-col :span="8">
                    <el-card>
                        <div class="card-logo clearfix">
                            <img id="vue-logo" src="@/assets/vue_logo.png" />
                        </div>
                        <div class="card-title">
                            <span>Vue.js</span>
                        </div>
                        <div class="card-desc">
                            <p>
                                站点由<Han />Vue.js<Han />强力驱动
                            </p>
                            <p>给你带来畅快的使用体验</p>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card>
                        <div class="card-logo clearfix">
                            <i id="icon-stat" class="el-icon-s-data"></i>
                        </div>
                        <div class="card-title">
                            <span>便捷统计</span>
                        </div>
                        <div class="card-desc">
                            <p>版本号自动记录</p>
                            <p>一个应用仅需设置一次</p>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card>
                        <div class="card-logo clearfix">
                            <i id="icon-sugar" class="el-icon-sugar"></i>
                        </div>
                        <div class="card-title">
                            <span>灵活接口</span>
                        </div>
                        <div class="card-desc">
                            <p>调用方式简单</p>
                            <p>任何应用均可快速接入</p>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Han from '@/components/basic/Han.vue'

export default {
    name: 'landing.home.main',
    methods: {
        goLogin() {
            this.$router.push({
                name: 'landing.portal'
            })
        }
    },
    components: {
        Han
    }
}
</script>

<style lang="less" scoped>
span, p {
    color: #606266;
    font-weight: 500;
    user-select: none;
    -webkit-user-drag: none;
}
img, i{
    user-select: none;
    -webkit-user-drag: none;
}
.cards-wrapper {
    width: 100%;
    overflow: hidden;
}
.row-start{
    text-align: center;
    margin-top: 2.75rem;
}
.row-cards {
    padding-top: 4.25rem;
    width: 900px;
    margin: 0 auto;
}
.el-card {
    margin: 0 1.25rem;
    height: 300px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12) !important;
}
.card-logo {
    text-align: center;
    padding: 1rem;
    height: 68px;
    i{
        font-size: 3.75rem;
    }
    img {
        width: 4rem;
    }
}
#icon-stat {
    color: #F1B50E;
}
#icon-sugar {
    color: rgb(255, 100, 100);
}
.card-title {
    text-align: center;
    padding-top: 0.75rem;
    font-size: 1.25rem;
    letter-spacing: 0.05rem;
}
.card-desc {
    padding-top: 2rem;
    font-size: 1rem;
    text-align: center;
    letter-spacing: 0.025rem;
}
@media (max-width: 1600px) {
    .row-start{
        margin-top: 1.5rem;
    }
    .row-cards {
        padding-top: 2.125rem;
    }
    .el-card {
        height: 280px;
    }
    .card-logo {
        padding: 0.625rem;
    }
    .card-title {
        padding-top: 0.75rem;
    }
    .card-desc {
        padding-top: 0.825rem;
    }
}
@media (max-width: 1024px) {
    .row-cards {
        width: 80vw;
    }
}
@media (max-width: 768px) {
    .el-col-8 {
        width: 100%;
    }
    .el-card {
        margin: 12px;
    }
    .card-logo {
        padding: 0.75rem;
    }
    .card-title {
        padding-top: 0.5rem;
    }
    .card-desc {
        padding-top: 0.75rem;
    }
    .row-start{
        display: none;
    }
}
</style>
