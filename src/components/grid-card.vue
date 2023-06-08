<script setup>

defineProps({
    items: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <div class="grid-container">
        <house-card v-for="(i,index) in items" :key="index" :item="i" class="mb-8 cursor-pointer"></house-card>
    </div>
</template>
  
<style scoped>
.grid-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5%;
    padding: 10px;
    width: 100%;
}
.grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 30px;
}
</style>
  