<script setup>
import gridCard from '../../../components/grid-card.vue'
import { ref } from 'vue';


const houses = ref([{
    src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    name: 'hamburger'
},
{
    src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    name: 'hamburger'
},
{
    src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    name: 'hamburger'
},
{
    src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    name: 'hamburger'
},
{
    src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    name: 'hamburger'
},
{
    src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    name: 'hamburger'
},
{
    src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    name: 'hamburger'
}]);
const activeIndex = ref('1');
function handleSelect (key, value) {
    console.log(key, value);
}
</script>
<template>
    <div>
        <div class="recommend__title">Nhà đất phù hợp với bạn</div>
        <div class="recommend__menu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">Processing Center</el-menu-item>
                <el-menu-item index="3" disabled>Info</el-menu-item>
                <el-menu-item index="4">Orders</el-menu-item>
            </el-menu>
        </div>
        <grid-card :items="houses"></grid-card>
        <div class="recommend__footer">
            <el-button link>Xem tất cả ></el-button>
            </div>
    </div>
</template>