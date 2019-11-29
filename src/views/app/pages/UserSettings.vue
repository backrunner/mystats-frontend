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
                    <el-form label-width="80px" :model="userInfoForm" id="form-avatar">
                        <el-form-item label="当前头像">
                            <el-avatar :size="100" :src="avatarUrl"></el-avatar>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" round id="btn-uploadAvatar">上传新头像</el-button>
                        </el-form-item>
                    </el-form>
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
                            <span>
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
                            <span>
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
                    <el-table :data="loginLog" style="width: 100%">
                        <el-table-column prop="time" label="时间" width="180"></el-table-column>
                        <el-table-column prop="ipaddress" label="IP地址" width="180"></el-table-column>
                        <el-table-column prop="location" label="位置"></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "app.page.usersettings",
    data() {
        return {
            basicInfoStatus: "lock",
            userInfoForm: {
                username: "",
                phone: "",
                email: ""
            },
            loginLog: {}
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
        this.userInfoForm.username = this.$store.state.userinfo.username
        this.userInfoForm.email = this.$store.state.userinfo.email
        this.userInfoForm.phone = this.$store.state.userinfo.phone
    },
    computed: {
        username() {
            return this.$store.state.userinfo.username;
        },
        avatarUrl() {
            return this.$store.state.userAvatar == null ||
                this.$store.state.userAvatar.length < 0
                ? "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                : this.$state.userAvatar.length;
        }
    },
    methods: {
        // 编辑基本信息
        doEdit() {
            this.basicInfoStatus = "edit";
        },
        cancelEdit() {
            this.basicInfoStatus = "lock";
            this.userInfoForm.email = this.$store.state.userinfo.email;
            this.userInfoForm.phone = this.$store.state.userinfo.phone;
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
}
.box-card > .el-card__header {
    padding: 14px 20px;
}
.usersettings-hello {
    user-select: none;
    -webkit-user-drag: none;
}
.usersettings-hello > p {
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.05rem;
    margin: 0;
    color: #606266;
}
.card-header > span {
    color: #606266;
}

// card-modifypassword
.card-icons {
    height: @card-height;
}
.card-icons > .el-card__body {
    display: flex;
    flex-direction: row;
    padding: 0;
}
.card-icons > .el-card__body > .box-card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: @card-height !important;
    height: @card-height;
    background: #f1b50e;
    color: white;
    font-size: 58px;
}
#card-cancelAccount > .el-card__body > .box-card-icon {
    background: #f56c6c;
}
.card-icons > .el-card__body > .box-card-right {
    flex: 1 1 auto;
    padding: 18px 25px;
    display: inline-block;
}
.card-icons > .el-card__body > .box-card-right > .box-card-title {
    font-size: 18px;
    margin-bottom: 10px;
    color: #606266;
}
.card-icons > .el-card__body > .box-card-right > .box-card-desc {
    margin-bottom: 24px;
}
.card-icons > .el-card__body > .box-card-right > .box-card-desc > span {
    font-size: 14px;
    color: #909399;
}
.card-icons > .el-card__body > .box-card-right > .box-card-action > span {
    font-size: 14px;
    color: #f1b50e;
}
#card-cancelAccount
    > .el-card__body
    > .box-card-right
    > .box-card-action
    > span {
    color: #f56c6c;
}
.card-icons > .el-card__body > .box-card-right > .box-card-action > span > i {
    margin-left: 4px;
}
.card-icons > .el-card__body > .box-card-right > .box-card-action > span:hover {
    color: darken(#f1b50e, 5%);
    cursor: pointer;
}

.card-icons-mt {
    margin-top: 14px;
}

// card-avatar
#card-avatar {
    margin-bottom: 16px;
}
#form-avatar > .el-form-item > .el-form-item__content {
    line-height: 0 !important;
}
#btn-uploadAvatar {
    margin-left: 6px;
}

// card-loginLog
#card-loginLog {
    margin-top: 1rem;
}
#card-loginLog > .el-card__body {
    padding: 4px 20px 20px 20px
}
</style>
