<template>
    <div class="header-bar">
        <div class="fold-button">
            <FoldButton></FoldButton>
        </div>
    </div>
</template>

<script>
import FoldButton from '@/components/app/basic/FoldButton.vue'
export default {
    name: 'app.main.headerBar',
    components: {
        FoldButton
    }
}
</script>

<style lang="less">
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
</style>
