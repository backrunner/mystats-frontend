<template>
    <div class="appview appview-usersettings">
        <el-row>
            <el-col :span="24" class="row-hello">
                <el-card class="box-card">
                    <div class="usersettings-hello">
                        <p>你好，{{ username }}！</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="row-settings">
            <el-col :span="14">
                <el-card class="box-card" id="card-avatar">
                    <div slot="header" class="card-header clearfix">
                        <span>头像</span>
                    </div>
                    <div class="form-wrapper">
                        <el-form label-width="80px" width="240px" :model="userInfoForm" id="form-avatar">
                            <el-form-item label="当前头像">
                                <el-avatar :size="avatarSize" :src="avatarUrl"></el-avatar>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" round id="btn-uploadAvatar" @click="setEmail">设置邮箱</el-button>
                            </el-form-item>
                        </el-form>
                        <div class="avatar-desc">
                            <div class="avatar-desc-label">
                                <label>提示</label>
                            </div>
                            <div class="avatar-desc-text">
                                <p>我们使用的是<Han/>Gravatar<Han/>的头像服务，头像由邮箱确定</p>
                                <p>设置邮箱后，头像才能够正确显示</p>
                                <p>上传新头像、绑定邮箱等需前往<Han/>Gravatar</p>
                            </div>
                            <div class="avatar-desc-action">
                                <el-button type="primary" round @click="goGravatar">前往<Han/>Gravatar</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
                <el-card class="box-card" id="card-basic">
                    <div slot="header" class="card-header clearfix">
                        <span>基本信息</span>
                        <template v-if="basicInfoStatus == 'lock'">
                            <el-button
                                style="float: right; padding: 3px 0"
                                type="text"
                                @click="doEdit"
                            >编辑</el-button>
                        </template>
                        <template v-else>
                            <el-button
                                style="float: right; padding: 3px 0px 3px 12px"
                                type="text"
                                :disabled="submitEditDisabled"
                                @click="submitEdit"
                            >保存</el-button>
                            <el-button
                                style="float: right; padding: 3px 0"
                                type="text"
                                @click="cancelEdit"
                            >取消</el-button>
                        </template>
                    </div>
                    <el-form label-width="80px" :model="userInfoForm">
                        <el-form-item label="用户名">
                            <el-input v-model="userInfoForm.username" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱地址">
                            <el-input
                                v-model="userInfoForm.email"
                                :disabled="basicInfoStatus == 'lock'"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="手机">
                            <el-input
                                v-model="userInfoForm.phone"
                                :disabled="basicInfoStatus == 'lock'"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="10">
                <el-card class="box-card card-icons" id="card-modifypassword">
                    <div class="box-card-icon">
                        <i class="el-icon-lock"></i>
                    </div>
                    <div class="box-card-right">
                        <div class="box-card-title">
                            <span>修改密码</span>
                        </div>
                        <div class="box-card-desc">
                            <span>定期修改密码可为你的帐号提供高强度的保护</span>
                        </div>
                        <div class="box-card-action">
                            <span @click="popupChangePassword">
                                立即修改
                                <i class="el-icon-arrow-right"></i>
                            </span>
                        </div>
                    </div>
                </el-card>
                <el-card class="box-card card-icons card-icons-mt" id="card-cancelAccount">
                    <div class="box-card-icon">
                        <i class="el-icon-warning"></i>
                    </div>
                    <div class="box-card-right">
                        <div class="box-card-title">
                            <span>注销帐号</span>
                        </div>
                        <div class="box-card-desc">
                            <span>将您正在使用的帐号彻底废弃，从平台上注销</span>
                        </div>
                        <div class="box-card-action">
                            <span @click="popupCancelAccount">
                                注销
                                <i class="el-icon-arrow-right"></i>
                            </span>
                        </div>
                    </div>
                </el-card>
                <el-card class="box-card" id="card-loginLog">
                    <div slot="header" class="card-header clearfix">
                        <span>最近登录记录</span>
                    </div>
                    <el-table :data="loginLog" style="width: 100%" v-loading="loginLogLoading">
                        <el-table-column prop="createTime" label="时间" width="180"></el-table-column>
                        <el-table-column prop="ip" label="IP地址" width="180"></el-table-column>
                        <el-table-column prop="geo" label="位置"></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog
            title="修改密码"
            :visible.sync="changePasswordDialogVisible"
            width="30%">
            <el-form ref="changePasswordForm" :model="changePasswordForm" :rules="changePasswordFormRule">
                <el-form-item prop="oldPassword" label="旧密码">
                    <el-input type="password" v-model="changePasswordForm.oldPassword"></el-input>
                </el-form-item>
                <el-form-item prop="newPassword" label="新密码">
                    <el-input type="password" v-model="changePasswordForm.newPassword"></el-input>
                </el-form-item>
                <el-form-item prop="newConfirmPassword" label="确认密码">
                    <el-input type="password" v-model="changePasswordForm.confirmPassword"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changePasswordDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitChangePassword">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="注销帐号"
            :visible.sync="cancalAccountVisible"
            width="30%"
            >
            <el-form :model="cancalAccountForm" :rules="cancalAccountFormRule">
                <span>需要您的密码确认该操作，帐号注销后所有数据都将删除，无法恢复！</span>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" v-model="cancalAccountForm.password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancalAccountVisible = false">取消</el-button>
                <el-button type="danger" @click="submitCancelAccount" :disabled="submitCancelAccountDisabled">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Encryption from '@/utils/encryption.js'
import Han from '@/components/basic/Han.vue'

export default {
    name: "app.page.usersettings",
    components: {
        Han
    },
    data() {
        return {
            basicInfoStatus: "lock",
            userInfoForm: {
                username: "",
                phone: "",
                email: ""
            },
            changePasswordForm: {
                oldPassword: "",
                newPassword: "",
                newConfirmPassword: ""
            },
            changePasswordFormRule: {
                oldPassword: [{
                    required: true,
                    message: '旧密码不能为空',
                    trigger: 'blur'
                }, {
                    min: 6,
                    message: '密码长度不能低于6位',
                    trigger: 'blur'
                }],
                newPassword: [{
                    required: true,
                    message: '新密码不能为空',
                    trigger: 'blur'
                }, {
                    min: 6,
                    message: '密码长度不能低于6位',
                    trigger: 'blur'
                }],
                newConfirmPassword: [{
                    required: true,
                    message: '确认密码不能为空',
                    trigger: 'blur'
                }, {
                    min: 6,
                    message: '密码长度不能低于6位',
                    trigger: 'blur'
                }]
            },
            cancalAccountForm: {
                password: ''
            },
            cancalAccountFormRule: {
                password: [{
                    required: true,
                    trigger: 'blur'
                }]
            },
            loginLog: [],
            loginLogLoading: true,
            submitEditDisabled: false,
            submitCancelAccountDisabled: false,
            changePasswordDialogVisible: false,
            cancalAccountVisible: false,
            avatarSize: 100
        };
    },
    watch: {
        "$store.state.userinfo.username": function(newValue) {
            this.userInfoForm.username = newValue;
        },
        "$store.state.userinfo.email": function(newValue) {
            this.userInfoForm.email = newValue;
        },
        "$store.state.userinfo.phone": function(newValue) {
            this.userInfoForm.phone = newValue;
        }
    },
    mounted() {
        this.userInfoForm.username = this.$store.state.userinfo.username;
        this.userInfoForm.email = this.$store.state.userinfo.email;
        this.userInfoForm.phone = this.$store.state.userinfo.phone;
        // 获取登录日志信息
        this.axios.get("/api/user/listLoginLog").then(response => {
            if (response.status == 200) {
                this.loginLog = response.data.data;
            }
            this.loginLogLoading = false;
        });
    },
    computed: {
        username() {
            return this.$store.state.userinfo.username;
        },
        avatarUrl() {
            return this.getAvatarUrl()
        }
    },
    methods: {
        // 编辑基本信息
        doEdit() {
            this.basicInfoStatus = "edit";
        },
        submitEdit() {
            this.submitEditDisabled = true;
            // 三秒后允许再次提交
            setTimeout(() => {
                if (this.submitEditDisabled) {
                    this.submitEditDisabled = false;
                }
            }, 3000);
            this.axios
                .post("/api/user/changeBaseInfo", {
                    newEmail: this.userInfoForm.email,
                    newPhone: this.userInfoForm.phone
                })
                .then(response => {
                    this.submitEditDisabled = false;
                    if (response.status != 200) {
                        this.$message.error("保存失败");
                        return;
                    }
                    if (response.data.code == 200) {
                        this.$message.success("保存成功");
                        this.basicInfoStatus = "lock";
                        this.$store.commit("userinfo/setEmail", this.userInfoForm.email);
                        this.$store.commit("userinfo/setPhone", this.userInfoForm.phone);
                    } else {
                        this.$message.error(response.data.message);
                    }
                });
        },
        cancelEdit() {
            this.basicInfoStatus = "lock";
            this.userInfoForm.email = this.$store.state.userinfo.userEmail;
            this.userInfoForm.phone = this.$store.state.userinfo.userPhone;
        },
        popupChangePassword() {
            this.changePasswordDialogVisible = true;
            this.clearChangePassword()
        },
        clearChangePassword() {
            this.changePasswordForm.oldPassword = '';
            this.changePasswordForm.newPassword = '';
            this.changePasswordForm.newConfirmPassword = '';
        },
        submitChangePassword(){
            // 验证表单
            this.$refs['changePasswordForm'].validate((valid) => {
                if (!valid) {
                    return false;
                }
                // 提交请求
                this.axios.post('/api/user/changePassword', {
                    oldPassword: this.changePasswordForm.oldPassword,
                    newPassword: this.changePasswordForm.newPassword,
                    newConfirmPassword: this.changePasswordForm,newConfirmPassword
                }).then((response) => {
                    if (response.status != 200){
                        this.$message.error("修改密码失败")
                        return
                    }
                    if (response.data.code == 200){
                        this.$message.success("修改密码成功")
                        this.clearChangePassword();
                        this.changePasswordDialogVisible = false;
                    } else {
                        this.$message.success(response.data.message)
                    }
                })
            })
        },
        getAvatarUrl(){
            if (typeof this.$store.state.userinfo.email == 'undefined' || this.$store.state.userinfo.email == null || this.$store.state.userinfo.email.length < 1){
                return "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            } else {
                let email_hash = Encryption.md5(this.$store.state.userinfo.email);
                return 'https://www.gravatar.com/avatar/'+email_hash+'?s='+this.avatarSize
            }
        },
        setEmail() {
            this.doEdit()
        },
        goGravatar() {
            window.open('https://en.gravatar.com/emails/')
        },
        popupCancelAccount(){
            this.cancalAccountForm.password = ''
            this.cancalAccountVisible = true
        },
        submitCancelAccount(){
            this.$refs['cancelAccountForm'].validate((valid) => {
                if (!valid) {
                    return false;
                }
                this.submitCancelAccountDisabled = true
                this.axios.post('/api/user/cancelAccount', {
                    password: this.cancalAccountForm.password
                }).then((response) => {
                    this.submitCancelAccountDisabled = false
                    if (response.status == 200){
                        if (response.data.code == 200){
                            this.$message.success('注销成功')
                            setTimeout(()=>{
                                this.$router.push({
                                    name: 'landing.home'
                                })
                            }, 2000);
                        }
                    } else {
                        this.$message.error('网络通信错误')
                    }
                });
            });
        }
    }
};
</script>

<style lang="less">
@card-height: 141px;

.appview {
    margin: 1.25rem;
}
.box-card {
    margin: 8px;
    box-shadow: 0 0px 8px rgba(0, 0, 0, 0.05) !important;
    user-select: none;
    -webkit-user-drag: none;
    .el-card__header {
        padding: 14px 20px;
    }
}
.usersettings-hello {
    user-select: none;
    -webkit-user-drag: none;
    p {
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 0.05rem;
        margin: 0;
        color: #606266;
    }
}
.card-header > span {
    color: #606266;
}

// card-modifypassword
.card-icons {
    height: @card-height;
    .el-card__body {
        display: flex;
        flex-direction: row;
        padding: 0;
        .box-card-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: @card-height !important;
            height: @card-height;
            background: #f1b50e;
            color: white;
            font-size: 58px;
        }
        .box-card-right {
            flex: 1 1 auto;
            padding: 18px 25px;
            display: inline-block;
            .box-card-title {
                font-size: 18px;
                margin-bottom: 10px;
                color: #606266;
            }
            .box-card-desc {
                margin-bottom: 24px;
                span {
                    font-size: 14px;
                    color: #909399;
                }
            }
            .box-card-action {
                span {
                    font-size: 14px;
                    color: #f1b50e;
                    i {
                        margin-left: 4px;
                    }
                }
                span:hover {
                    color: darken(#f1b50e, 5%);
                    cursor: pointer;
                }
            }
        }
    }
}
#card-cancelAccount {
    .el-card__body {
        .box-card-icon {
            background: #f56c6c;
        }
        .box-card-right {
            .box-card-action {
                span {
                    color: #f56c6c;
                }
            }
        }
    }
}


.card-icons-mt {
    margin-top: 14px;
}

// card-avatar
#card-avatar {
    margin-bottom: 16px;
}
.form-wrapper{
    display: flex;
}
#form-avatar {
    width: 240px;
}
.avatar-desc {
    flex: 1 2 auto;
}
.avatar-desc-label {
    float: left;
    font-size: 14px;
    color: #606266;
    label {
        line-height: 40px;
    }
}
.avatar-desc-text {
    display: block;
    margin-left: 50px;
    margin-top: 10px;
    font-size: 14px;
    color: #606266;
    p {
        margin-top: 0;
        margin-bottom: 8px;
    }
}
.avatar-desc-action {
    margin-top: 64px;
    margin-left: 48px;
}
#form-avatar > .el-form-item > .el-form-item__content {
    line-height: 0 !important;
}
#btn-uploadAvatar {
    margin-left: 14px;
}

// card-loginLog
#card-loginLog {
    margin-top: 1rem;
    .el-card__body {
        padding: 4px 20px 20px 20px;
    }
}
</style>
