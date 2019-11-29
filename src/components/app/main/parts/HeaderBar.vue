<template>
    <div class="header-bar">
        <div class="fold-button">
            <FoldButton></FoldButton>
        </div>
        <div class="breadcrumb">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="user-module">
            <UserAvatar></UserAvatar>
        </div>
    </div>
</template>

<script>
import FoldButton from '@/components/app/basic/FoldButton.vue'
import Breadcrumb from '@/components/app/basic/Breadcrumb.vue'
import UserAvatar from '@/components/app/basic/UserAvatar.vue'

export default {
    name: 'app.main.headerBar',
    components: {
        FoldButton,
        Breadcrumb,
        UserAvatar
    }
}
</script>

<style lang="less">
.user-module{
    float: right;
}
</style>

<style lang="less" scoped>
@headerbar-height: 56px;
.header-bar{
    height: @headerbar-height;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
}
.fold-button{
    display: inline-block;
    line-height: @headerbar-height;
    color: #5a5e66;
    font-size: 21px;
    padding: 0 16px;
    transition: 100ms;
}
.fold-button:hover{
    cursor: pointer;
    color:#828282;
}
.breadcrumb{
    display: inline-block;
    user-select: none;
    -webkit-user-drag: none;
}
</style>
