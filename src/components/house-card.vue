<script setup>
import { Icon } from '@iconify/vue'
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
function detailHouse() {
  console.log('house', props.item)
}
</script>
<template>
  <el-card
    :body-style="{ padding: '0px' }"
    @click="detailHouse"
  >
    <el-image :src="item.src" style="width: 400px; height: 250px" fit="fill"></el-image>
    <div class="card__info">
      <div class="card__info--overview">
        <div class="font-bold">
          {{ item.money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) }}
        </div>
        <div class="flex gap-4">
          <div class="card__info-container card__info--bedroom">
            <div class="card__info-icon">
              <Icon icon="material-symbols:bedroom-parent-outline" />
            </div>
            <div class="card__info-text">
              {{ item.bedroom }}
            </div>
          </div>
          <div class="flex card__info-container card__info--square">
            <div class="card__info-icon">
              <Icon icon="material-symbols:square-foot-sharp" />
            </div>
            <div class="card__info-text">{{ item.square }}m²</div>
          </div>
        </div>
      </div>
      <div class="card__info--description">
        <el-link href="https://element-plus.org" target="_blank">{{ item.description }}</el-link>
        <div>{{ item.address }}</div>
      </div>
    </div>
  </el-card>
</template>
<style scoped>
:deep(.el-card__body) {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.card__info-text{
    font-size: smaller;
    color: #a2a2a2;
}
.card__info {
  margin: 12px;
}

.card__info--overview {
  display: flex;
  justify-content: space-between;
}
.card__info-container{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
}
</style>
