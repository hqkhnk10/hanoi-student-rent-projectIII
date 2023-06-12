<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route=useRoute();

const path = computed(() => route.path)
const state = ref()
state.value = sessionStorage.getItem('id');
const logout = () =>{
    sessionStorage.removeItem('id');
    state.value = undefined
}
</script>
<template>
    <el-menu :default-active="path" class="el-menu-demo" mode="horizontal" router :ellipsis="false">
        <el-menu-item index="/homepage" route="/homepage">Trang chủ</el-menu-item>
        <el-menu-item index="/houses" route="/houses">Nhà</el-menu-item>
        <el-menu-item index="/googlemap" route="/googlemap">GoogleMaps</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="4" route="login" v-if="isNaN(state)">Đăng nhập</el-menu-item>
        <el-sub-menu index="2" class="mr-4" v-if="!isNaN(state)" >
            <template #title>Tài khoản</template>
            <el-menu-item index="2-1"><el-icon><InfoFilled /></el-icon>Thông tin cá nhân</el-menu-item>
            <el-menu-item index="2-2"><el-icon><StarFilled /></el-icon>Nhà quan tâm</el-menu-item>
            <el-menu-item index="2-3"><el-icon><HomeFilled /></el-icon>Nhà đang cho thuê</el-menu-item>
            <el-menu-item @click="logout"><el-icon><SwitchButton /></el-icon>Đăng xuất</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>