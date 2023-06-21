<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const path = computed(() => route.path)
const state = ref()
const name = ref()
state.value = sessionStorage.getItem('id')
name.value = sessionStorage.getItem('name')

const { push } = useRouter()
const logout = () => {
  sessionStorage.removeItem('id')
  state.value = undefined
  push('/homepage')
}
let detailUser = computed(() => {
  return `/detail-user/${state.value}`
})
</script>
<template>
  <el-menu :default-active="path" class="el-menu-demo" mode="horizontal" router :ellipsis="false">
    <el-menu-item index="/homepage" route="/homepage">Trang chủ</el-menu-item>
    <el-menu-item index="/houses" route="/houses">Nhà</el-menu-item>
    <el-menu-item index="/googlemap" route="/googlemap">GoogleMaps</el-menu-item>
    <el-menu-item index="/admin" route="/admin" v-if="state == 26">Trang admin</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="4" route="login" v-if="isNaN(state) || state == null"
      >Đăng nhập</el-menu-item
    >
    <el-sub-menu index="2" class="mr-4" v-else>
      <template #title>Tài khoản</template>
      <el-menu-item index="" :route="detailUser"
        ><el-icon><InfoFilled /></el-icon>Thông tin cá nhân</el-menu-item
      >
      <el-menu-item index="/rented" route="/rented"
        ><el-icon><HomeFilled /></el-icon>Quản lý nhà cho thuê</el-menu-item
      >
      <el-menu-item @click="logout"
        ><el-icon><SwitchButton /></el-icon>Đăng xuất</el-menu-item
      >
    </el-sub-menu>
  </el-menu>
</template>
