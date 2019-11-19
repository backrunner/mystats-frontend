<template>
    <div class="panel-aside">
        <el-row class="row-title">
            <el-col :span="24">
                <template v-if="status == 'login'">
                    <span class="portal-title">登录</span>
                </template>
                <template v-else-if="status == 'register'">
                    <span class="portal-title">注册</span>
                </template>
            </el-col>
        </el-row>
        <el-row class="row-form">
            <template v-if="status == 'login'">
                <el-col :span="24">
                    <el-form ref="form" class="portal-form" :model="loginForm" label-position="top" label-width="80px">
                        <el-form-item >
                            <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item >
                            <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <span>Reserved</span>
                        </el-form-item>
                        <div class="form-beyond-footer">
                            <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
                            <a class="forget-password">忘记密码?</a>
                        </div>
                        <el-form-item>
                            <el-button type="primary" @click="onLogin" class="form-footer-btn form-footer-btn-primary">登录</el-button>
                            <el-button @click="toRegister" class="form-footer-btn form-footer-btn-secondary">注册</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </template>
            <template v-else-if="status == 'register'">
                <el-col :span="24">
                    <el-form ref="form" class="portal-form" :model="registerForm" label-position="top" label-width="80px">
                        <el-form-item>
                            <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="registerForm.password" type="password" placeholder="密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="registerForm.confirmPassword" type="password" placeholder="确认密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <span>Reserved</span>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onRegister" class="form-footer-btn form-footer-btn-primary">注册</el-button>
                            <el-button @click="toLogin" class="form-footer-btn form-footer-btn-secondary">已有帐号</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </template>
        </el-row>
        <div class="back-home">
            <a @click="toIndex"><i class="el-icon-back" style="margin-right: 12px;"></i>返回主页</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            status: 'login',
            loginForm:{
                username: '',
                password: '',
                rememberMe: false,
            },
            registerForm:{
                username:'',
                password:'',
                confirmPassword:''
            }
        }
    },
    methods: {
        onLogin(){

        },
        onRegister(){

        },
        toLogin(){
            this.$set(this, 'status', 'login')
        },
        toRegister(){
            this.$set(this, 'status', 'register')
        },
        toIndex(){
            this.$router.push({
                name: 'landing.home'
            })
        }
    },
    name: "landing.portal.sidePanel"
};
</script>

<style lang="less" scoped>
span, a{
    color: #606266;
    font-weight: 500;
}
.row-title{
    padding-top: 18vh;
    text-align: center;
    margin-bottom: 22px;
}
.portal-title{
    font-size: 1.5rem;
    letter-spacing: 0.25rem;
}
.forget-password{
    float: right;
    font-size: 14px;
    transition: 200ms;
}
.forget-password:hover{
    cursor: pointer;
    color: #F1B50E;
}
.form-beyond-footer{
    margin-bottom: 14px;
}
.form-footer-btn{
    width: 48%;
}
.form-footer-btn-secondary{
    margin-left: 4%;
}
.back-home{
    margin-top: 24vh;
}
.back-home > a{
    font-size: 14px;
    transition: 200ms;
    user-select: none;
    -webkit-user-drag: none;
}
.back-home > a:hover{
    color: #F1B50E;
    cursor: pointer;
}
</style>