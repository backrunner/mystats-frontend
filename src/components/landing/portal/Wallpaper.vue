<template>
    <div class="wallpaper" :style="wallpaperStyle">
        <div class="wallpaper-overlay">
            <span>图片来自<Han/>Unsplash</span>
        </div>
    </div>
</template>

<script>
import Han from '@/components/basic/Han.vue'

export default {
    name: "landing.portal.Wallpaper",
    data() {
        return {
            wallpaperStyle: ""
        };
    },
    mounted() {
        this.setWallpaperPic()
    },
    methods: {
        getPicSize() {
            let width = document.documentElement.clientWidth
            let height = document.documentElement.clientHeight
            if (width <= 1280) {
                return "1280x720"
            } else if (width <= 1920) {
                return "1920x1080"
            } else if (width <= 2560 && height <= 1080) {
                return "2560x1080"
            } else if (width <= 2560 && height <= 1440) {
                return "2560x1440"
            } else if (width <= 3840) {
                return "3840x2160"
            }
        },
        setWallpaperPic() {
            this.$set(this, "wallpaperStyle", {
                backgroundImage: "url(https://source.unsplash.com/random/" + this.getPicSize() + ")"
            });
        }
    },
    components:{
        Han
    }
};
</script>

<style lang="less" scoped>
.wallpaper {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    z-index: 0;
}
.wallpaper-overlay{
    width: 100%;
    height: 100%;
    z-index: 98;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%);
}
.wallpaper-overlay > span{
    position: absolute;
    bottom: 1rem;
    margin-left: 1.5rem;
    color: #8f8f8f;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.05rem;
    user-select: none;
    -webkit-user-drag: none;
}
</style>