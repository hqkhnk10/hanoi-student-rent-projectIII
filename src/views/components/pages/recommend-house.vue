<script setup>
import gridCard from '../../../components/grid-card.vue'
import { ref } from 'vue';


const houses = ref([{
    src: 'https://photo.rever.vn/v3/get/rvFFWfbLq_RqSCyD6X7Wm3wpJfrsJIXaJzI8j4YLWHNrbQKR7aivXKCUDzvv4zSm_ErCGUBVU7BXemfBPBlwM+1A==/450x300/image.jpg',
    name: 'hamburger',
    money: 0,
    bedroom: 0,
    square: 0,
    description: 'hamburger',
    address: 'hamburger address'
},{
    src: 'https://photo.rever.vn/v3/get/rvFFWfbLq_RqSCyD6X7Wm3wpJfrsJIXaJzI8j4YLWHNrbQKR7aivXKCUDzvv4zSm_ErCGUBVU7BXemfBPBlwM+1A==/450x300/image.jpg',
    name: 'hamburger',
    money: 0,
    bedroom: 0,
    square: 0,
    description: 'hamburger',
    address: 'hamburger address'
},{
    src: 'https://photo.rever.vn/v3/get/rvFFWfbLq_RqSCyD6X7Wm3wpJfrsJIXaJzI8j4YLWHNrbQKR7aivXKCUDzvv4zSm_ErCGUBVU7BXemfBPBlwM+1A==/450x300/image.jpg',
    name: 'hamburger',
    money: 0,
    bedroom: 0,
    square: 0,
    description: 'hamburger',
    address: 'hamburger address'
},{
    src: 'https://photo.rever.vn/v3/get/rvFFWfbLq_RqSCyD6X7Wm3wpJfrsJIXaJzI8j4YLWHNrbQKR7aivXKCUDzvv4zSm_ErCGUBVU7BXemfBPBlwM+1A==/450x300/image.jpg',
    name: 'hamburger',
    money: 0,
    bedroom: 0,
    square: 0,
    description: 'hamburger',
    address: 'hamburger address'
},{
    src: 'https://photo.rever.vn/v3/get/rvFFWfbLq_RqSCyD6X7Wm3wpJfrsJIXaJzI8j4YLWHNrbQKR7aivXKCUDzvv4zSm_ErCGUBVU7BXemfBPBlwM+1A==/450x300/image.jpg',
    name: 'hamburger',
    money: 0,
    bedroom: 0,
    square: 0,
    description: 'hamburger',
    address: 'hamburger address'
},{
    src: 'https://photo.rever.vn/v3/get/rvFFWfbLq_RqSCyD6X7Wm3wpJfrsJIXaJzI8j4YLWHNrbQKR7aivXKCUDzvv4zSm_ErCGUBVU7BXemfBPBlwM+1A==/450x300/image.jpg',
    name: 'hamburger',
    money: 0,
    bedroom: 0,
    square: 0,
    description: 'hamburger',
    address: 'hamburger address'
}]);
const activeIndex = ref('1');
function handleSelect (key, value) {
    console.log(key, value);
}
</script>
<template>
    <div>
        <div class="recommend__title heading-03">Nhà đất phù hợp với bạn</div>
        <div class="recommend__menu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">Tất cả</el-menu-item>
                <el-menu-item index="4">Ba Đình</el-menu-item>
            </el-menu>
        </div>
        <grid-card :items="houses"></grid-card>
        <div class="recommend__footer">
            <el-button link>Xem tất cả ></el-button>
            </div>
    </div>
</template>
<style scoped>
.heading-03 {
    display: block;
    width: 100%;
    margin-bottom: 15px;
    font-family: rv-font2;
    font-size: 24px;
    line-height: 32px;
}
</style>