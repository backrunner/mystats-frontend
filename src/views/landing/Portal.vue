<template>
    <el-container>
        <el-aside class="side-panel">
            <SidePanel></SidePanel>
        </el-aside>
        <el-container>
            <el-main class="main">
                <Wallpaper></Wallpaper>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import SidePanel from "@/components/landing/portal/SidePanel.vue";
import Wallpaper from "@/components/landing/portal/Wallpaper.vue";

export default {
    name: "landing.portal",
    components: {
        SidePanel,
        Wallpaper
    },
    mounted(){
        this.checkLoginStatus()
    },
    methods: {
        checkLoginStatus() {
            this.axios.get("/api/portal/check").then((response) => {
                if (response.status == 200) {
                    if (response.data.code == 200) {
                        this.$router.push({
                            name: "app.page.dashboard"
                        });
                    }
                }
            });
        }
    }
};
</script>

<style lang="less">
html,
body,
.el-container {
    height: 100%;
}
body {
    margin: 0;
}
.side-panel {
    width: 540px !important;
    padding: 2.25rem;
    box-shadow: 0 0 1.5rem 0 #6e6e6e;
    overflow: hidden;
    z-index: 99;
}
.main {
    padding: 0;
    z-index: 0;
}

@media (max-width: 1600px) {
    .side-panel {
        width: 480px !important;
        padding: 1.5rem 2.25rem;
    }
}
</style>
