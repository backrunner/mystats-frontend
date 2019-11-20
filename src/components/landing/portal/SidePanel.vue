<template>
    <div class="panel-aside">
        <el-row class="row-title">
            <el-col :span="24">
                <div class="portal-title-logo">
                    <img src="@/assets/logo_256.png">
                </div>
                <template v-if="status == 'login'">
                    <span class="portal-title">欢迎使用
                        <Han />myStatics</span>
                </template>
                <template v-else-if="status == 'register'">
                    <span class="portal-title">注册</span>
                </template>
            </el-col>
        </el-row>
        <el-row class="row-form">
            <el-col :span="24">
                <el-form ref="loginForm" v-show="status == 'login'" class="portal-form" :model="loginForm" :rules="loginFormRules" label-position="top" label-width="80px">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
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
                <el-form ref="registerForm" v-show="status == 'register'" class="portal-form" :model="registerForm" :rules="registerFormRules" label-position="top" label-width="80px">
                    <el-form-item prop="username">
                        <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="registerForm.password" type="password" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="confirmPassword">
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
        </el-row>
        <div class="back-home">
            <a @click="toIndex"><i class="el-icon-back" style="margin-right: 12px;"></i>返回主页</a>
        </div>
    </div>
</template>

<script>
    import Han from '@/components/basic/Han.vue'

    export default {
        data() {
            return {
                status: 'login',
                loginForm: {
                    username: '',
                    password: '',
                    rememberMe: false,
                },
                registerForm: {
                    username: '',
                    password: '',
                    confirmPassword: ''
                },
                loginFormRules: {
                    username: [{
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur'
                    }, {
                        min: 6,
                        message: '用户名长度不能低于6个字符',
                        trigger: 'blur'
                    }, {
                        pattern: /^\w+$/,
                        message: '用户名只允许包含数字、字母、下划线',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }, {
                        min: 6,
                        message: '密码长度不能低于6位',
                        trigger: 'blur'
                    }]
                },
                registerFormRules: {
                    username: [{
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur'
                    }, {
                        min: 6,
                        message: '用户名长度不能低于6个字符',
                        trigger: 'blur'
                    }, {
                        pattern: /^\w+$/,
                        message: '用户名只允许包含数字、字母、下划线',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }, {
                        min: 6,
                        message: '密码长度不能低于6位',
                        trigger: 'blur'
                    }],
                    confirmPassword: [{
                        required: true,
                        message: '确认密码不能为空'
                    }, {
                        min: 6,
                        message: '确认密码长度不能低于6位'
                    }, {
                        validator: function(rule, value, callback) {
                            if (value != this.registerForm.password) {
                                callback(new Error('密码和确认密码不一致'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            onLogin() {
                this.$refs['loginForm'].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                });
            },
            onRegister() {
                this.$refs['registerForm'].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                });
            },
            toLogin() {
                this.$set(this, 'status', 'login')
            },
            toRegister() {
                this.$set(this, 'status', 'register')
            },
            toIndex() {
                this.$router.push({
                    name: 'landing.home'
                })
            }
        },
        name: "landing.portal.sidePanel",
        components: {
            Han
        }
    };
</script>

<style lang="less" scoped>
    span,
    a {
        color: #606266;
        font-weight: 500;
        user-select: none;
        -webkit-user-drag: none;
    }

    .portal-title-logo {
        user-select: none;
        -webkit-user-drag: none;
    }

    .portal-title-logo>img {
        width: 5rem;
        margin-left: -4px;
        margin-bottom: 2rem;
    }

    .row-title {
        padding-top: 11vh;
        margin-bottom: 22px;
    }

    .portal-title {
        font-size: 1.5rem;
        letter-spacing: 0.05rem;
    }

    .forget-password {
        float: right;
        font-size: 14px;
        transition: 200ms;
    }

    .forget-password:hover {
        cursor: pointer;
        color: #F1B50E;
    }

    .form-beyond-footer {
        margin-bottom: 14px;
    }

    .form-footer-btn {
        width: 48%;
    }

    .form-footer-btn-secondary {
        margin-left: 4%;
    }

    .back-home {
        margin-top: 24vh;
    }

    .back-home>a {
        font-size: 14px;
        transition: 200ms;
        user-select: none;
        -webkit-user-drag: none;
    }

    .back-home>a:hover {
        color: #F1B50E;
        cursor: pointer;
    }
</style>