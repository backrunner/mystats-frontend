<template>
    <div id="app">
        <transition mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<style lang="less" scoped>
#app {
    height: 100%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.v-enter {
    opacity: 0;
}
.v-enter-active {
    transition: 200ms;
}
.v-enter-to {
    opacity: 1;
}
.v-leave {
    opacity: 1;
}
.v-leave-to {
    opacity: 0;
}
.v-leave-active {
    transition: 200ms;
}
</style>