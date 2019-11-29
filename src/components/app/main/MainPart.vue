<template>
    <div class="main-part">
        <div class="header">
            <HeaderBar></HeaderBar>
        </div>
        <div class="app-view">
            <transition mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
import HeaderBar from './parts/HeaderBar.vue'
export default {
    name: 'app.main.mainPart',
    components: {
        HeaderBar
    }
}
</script>

<style lang="less" scoped>
.v-enter {
    opacity: 0;
}
.v-enter-active {
    transition: 50ms;
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
    transition: 50ms;
}
</style>
