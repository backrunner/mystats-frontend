<template>
    <el-container>
        <el-aside width="620px" class="side-panel">
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
            this.axios.get("/api/portal/check").then(response => {
                if (response.status == 200) {
                    if (response.data.code == 200) {
                        this.$router.push({
                            name: "app.main"
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
    padding: 2.25rem;
    box-shadow: 0 0 2rem 0 #6e6e6e;
    overflow: hidden;
    z-index: 99;
}
.main {
    padding: 0;
    z-index: 0;
}
</style>
