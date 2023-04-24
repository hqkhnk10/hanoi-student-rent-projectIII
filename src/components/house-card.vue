<script setup>
import { Icon } from '@iconify/vue';
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});
function detailHouse(){
    console.log('house', props.item)
}
</script>
<template>
    <el-card :body-style="{ padding: '0px' }" style="width:300px;height: 300px;cursor: pointer;" @click="detailHouse">
        <el-image :src="item.src" style="width: 300px;height: 200px;"></el-image>
        <div class="card__info">
            <div class="card__info--overview">
                <div class="font-bold">{{ item.money }}</div>
                <div class="card__info--bedroom">
                    <div class="card__info-icon">
                        <Icon icon="material-symbols:bedroom-parent-outline" />
                    </div>
                    {{ item.bedroom }}
                </div>
                <div class="card__info--square">
                    <div class="card__info-icon">
                        <Icon icon="material-symbols:square-foot-sharp" />
                    </div>
                    {{ item.square }}</div>
            </div>
            <div class="card__info--description">
                <el-link href="https://element-plus.org" target="_blank">{{item.description}}</el-link>
                <div>{{ item.address }}</div>
            </div>
        </div>
    </el-card>
</template>
<style scoped>
:deep(.el-card__body) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.card__info {
    height: 100px;
}

.card__info-icon {
    height: 10px;
    width: 10px;
}
.card__info--overview{
    display: flex;
}
</style>