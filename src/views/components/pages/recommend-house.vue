<script setup>
import { useRouter } from 'vue-router'
import { getProperties } from '../../../api/property'
import gridCard from '../../../components/grid-card.vue'
import { ref, onBeforeMount } from 'vue'

onBeforeMount(() => {
  getProperties({ pageSize: 1, pageIndex: 9, status: 1 })
    .then((res) => {
      houses.value = res.data.map((row) => ({
        id: row.id,
        src: row?.imageURL,
        money: row.price,
        bedroom: row.bedrooms,
        square: row.area,
        description: row?.description,
        address: row.address
      }))
    })
    .catch(() => {})
})

const houses = ref([])
const activeIndex = ref('1')
function handleSelect(key, value) {
  console.log(key, value)
}
const { push } = useRouter()
const seeAll = () => {
  push('/houses')
}
</script>
<template>
  <div>
    <div class="recommend__title heading-03">Nhà đất phù hợp với bạn</div>
    <div class="recommend__menu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">Tất cả</el-menu-item>
        <el-menu-item index="4">Ba Đình</el-menu-item>
      </el-menu>
    </div>
    <grid-card :items="houses"></grid-card>
    <div class="recommend__footer">
      <el-button link @click="seeAll">Xem tất cả ></el-button>
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
