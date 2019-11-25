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
            this.$set(this, 'folded', !this.folded)

        }
    }
};
</script>
