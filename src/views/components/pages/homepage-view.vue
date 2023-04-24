<script setup>
import bannerView from '../layout/banner-view.vue';
import recommendHouse from './recommend-house.vue';
import featurePlaces from './feature-places.vue';

</script>
<template>
    <el-backtop :right="100" :bottom="100" />
    <banner-view></banner-view>
    <div class="mx-40">
        <feature-places></feature-places>
        <recommend-house></recommend-house>
    </div>
</template>