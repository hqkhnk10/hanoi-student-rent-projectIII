<script setup>
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const { push } = useRouter()
function detailHouse() {
  push({ path: `/detail-property/${props.item.id}` })
}
</script>
<template>
  <el-card :body-style="{ padding: '0px' }" style="width: 300px; height: 100%;" @click="detailHouse">
    <el-image
      :src="`http://127.0.0.1:8080/${item.src}`"
      style="width: 300px; height: 200px"
      fit="fill"
    ></el-image>
    <div class="card__info">
      <div class="card__info--overview">
        <div style="font-weight: 500" class="card-title">
          <span>
            {{
              item.money
                ? item.money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                : 0
            }}
          </span>
          <el-icon><Star /></el-icon>
        </div>
      </div>
      <div class="card__info--description">
        <a target="_blank">{{ item.description }}</a>
        <div>{{ item.address }}</div>
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
  </el-card>
</template>
<style scoped>
:deep(.el-card__body) {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.card__info-text {
  font-size: smaller;
  color: #a2a2a2;
}
.card__info {
  margin: 12px;
}

.card__info--overview {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card__info-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}
.card__info--description {
  text-align: left;
}
.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
