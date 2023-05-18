<script setup lang="ts">
import { ref } from "vue";
const items = ref([{
    src: 'https://photo.rever.vn/v3/get/m8sgt22ufK23zAKaupTzeH+7CNCkH1fORnYxoVSNMIE=/450x300/image.jpg',
    name: 'Project III',
    money: 10000000
},{
    src: 'https://photo.rever.vn/v3/get/m8sgt22ufK23zAKaupTzeH+7CNCkH1fORnYxoVSNMIE=/450x300/image.jpg',
    name: 'Project III',
    money: 10000000
},{
    src: 'https://photo.rever.vn/v3/get/m8sgt22ufK23zAKaupTzeH+7CNCkH1fORnYxoVSNMIE=/450x300/image.jpg',
    name: 'Project III',
    money: 10000000
},{
    src: 'https://photo.rever.vn/v3/get/m8sgt22ufK23zAKaupTzeH+7CNCkH1fORnYxoVSNMIE=/450x300/image.jpg',
    name: 'Project III',
    money: 10000000
},{
    src: 'https://photo.rever.vn/v3/get/m8sgt22ufK23zAKaupTzeH+7CNCkH1fORnYxoVSNMIE=/450x300/image.jpg',
    name: 'Project III',
    money: 10000000
}])
</script>
<template>
    <h2 class="heading-03"><a href="/du-an">Dự án mới nổi bật</a></h2>
    <el-carousel :interval="10000000" type="card">
        <el-carousel-item v-for="item in items" :key="item" class="img-container">
            <el-image :src="item.src" fit="fill"></el-image>
            <div class="bottom-left">
                <div class="font-bold">{{ item.name }}</div>
                <div>{{ item.money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) }}</div>
        </div>
        </el-carousel-item>
    </el-carousel>
</template>

<style scoped>
:deep(.el-image){
    width: 100%;
}
.img-container{
    width: 600px;
    height: 300px;
    background-color: #30333a;
}
/* Bottom left text */
.bottom-left {
    color: white;
  position: absolute;
  bottom: 12px;
  left: 16px;
}
.home-page .heading-03 {
    display: block;
    width: 100%;
    margin-bottom: 15px;
    font-family: rv-font2;
    font-size: 24px;
    line-height: 32px;
    font-weight: 700;
}
a {
    text-decoration: none;
    color: #30333a;
}
</style>