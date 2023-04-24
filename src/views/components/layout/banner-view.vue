<script setup>
import { ref } from "vue";

const bannerImage = ref([{
    src: "https://th.bing.com/th/id/OIP.avb9nDfw3kq7NOoP0grM4wHaEK?pid=ImgDet&rs=1"
},
{
    src: "https://th.bing.com/th/id/OIP.avb9nDfw3kq7NOoP0grM4wHaEK?pid=ImgDet&rs=1"
}]);
</script>
<template>
    <div class="block text-center" m="t-4">
        <div class="banner__wrapper">
            <div class="banner__content">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
            </div>
            <el-carousel trigger="click" height="100%" :interval="10000" class="banner__carousel">
                <el-carousel-item v-for="item in bannerImage" :key="item">
                    <el-image :src="item.src" fit="fill" class="banner__carousel--image"></el-image>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>
<style scoped>
.banner__content {
    display: flex;
    z-index: 1;
    position: relative;
    width: 50%;
    margin: auto;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
}

.banner__wrapper {
    position: relative;
    background-color: red;
    width: 100%;
    height: 500px;
}

.banner__carousel {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 0;
}

.banner__carousel--image {
    width: 100%;
    height: 100%;
}
</style>