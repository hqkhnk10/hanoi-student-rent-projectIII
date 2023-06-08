<script setup>
import { HomeFilled,SwitchButton,InfoFilled }  from '@element-plus/icons-vue' ;
// import {ref} from 'vue'
// const activeIndex = ref('0')
function handleSelect(key, keyPath) {
    console.log(key, keyPath)
}
</script>
<template>
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" router :ellipsis="false">
        <el-menu-item index="" route="homepage">Trang chủ</el-menu-item>
        <el-menu-item index="1" route="houses">Nhà</el-menu-item>
        <el-menu-item index="3" route="googlemap">GoogleMaps</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="4" route="login">Đăng nhập</el-menu-item>
        <el-sub-menu index="2" class="mr-4">
            <template #title>Tài khoản</template>
            <el-menu-item index="2-1"><el-icon><InfoFilled /></el-icon>Thông tin cá nhân</el-menu-item>
            <el-menu-item index="2-2"><el-icon><HomeFilled /></el-icon>Nhà quan tâm</el-menu-item>
            <el-menu-item index="2-3"><el-icon><HomeFilled /></el-icon>Nhà đang cho thuê</el-menu-item>
            <el-menu-item index="2-3"><el-icon><SwitchButton /></el-icon>Đăng xuất</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>