<template>
    <i :class="folded ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="foldOrExpand"></i>
</template>

<script>
export default {
    name: "app.main.basic.foldButton",
    data() {
        return {
            folded: false
        };
    },
    methods: {
        foldOrExpand(){
            this.folded = !this.folded
            this.$bus.emit('menu-status-changed', this.folded)
        }
    }
};
</script>
