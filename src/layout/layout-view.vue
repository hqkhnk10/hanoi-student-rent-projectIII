<script setup>
import menuHeader from '../views/components/layout/menu-header.vue';
</script>
<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <menu-header></menu-header>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>
<style scoped>
main{
    padding: 0;
}
</style>