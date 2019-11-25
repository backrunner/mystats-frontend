<template>
    <div class="main-part">
        <div class="header">
            <HeaderBar></HeaderBar>
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
