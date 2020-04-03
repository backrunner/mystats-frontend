<template>
    <div class="wallpaper" v-lazy:background-image="wallpaper">
        <div class="wallpaper-loading">
            <img src="https://img.backrunner.top/mystats/loading.gif">
        </div>
        <div class="wallpaper-overlay">
            <span>图片来自<Han/>Unsplash</span>
        </div>
    </div>
</template>

<script>
import Han from '@/components/basic/Han.vue'
import services from '@/service-config.json';

export default {
    name: "landing.portal.Wallpaper",
    data() {
        return {
            wallpaper: {
                src: ''
            }
        };
    },
    mounted() {
        this.getPic();
    },
    methods: {
        getPic() {
            this.axios({
                url: services.unsplash_redirect + "/random/" + this.getPicSize() + '?nature,water',
                method: 'get',
                withCredentials: false
            }).then(res => {
                if (res) {
                    this.wallpaper.src = res.data.data
                }
            })
        },
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
    animation:fadeIn 250ms;
}
.wallpaper-loading{
    float: left;
    width: 100%;
    height: 100%;
    user-select: none;
    -webkit-user-drag: none;
    img{
        position: relative;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%)
    }
}
.wallpaper-overlay{
    width: 100%;
    height: 100%;
    z-index: 98;
    display: none;
    transition: 100ms;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.0) 45%, rgba(0, 0, 0, 0.6) 65%, rgba(0, 0, 0, 0.75) 85%);
    span{
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
}
.wallpaper[lazy=loaded] > .wallpaper-loading{
    display: none;
    animation: fadeOut 200ms;
}
.wallpaper[lazy=loaded] > .wallpaper-overlay{
    display: block;
    animation: fadeIn 250ms;
}
@keyframes fadeIn {
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
@keyframes fadeOut {
    100%{
        opacity: 0;
    }
    0%{
        opacity: 1;
    }
}
</style>
