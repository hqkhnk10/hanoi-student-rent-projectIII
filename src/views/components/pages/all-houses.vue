<script setup>
import { getProperties } from '../../../api/property'
import gridCard from '../../../components/grid-card.vue'
import { ref, onBeforeMount } from 'vue'

const params = ref({ price: null,area:null, project: null, keyword: null, status: 1 })
const houses = ref([])
onBeforeMount(() => {
  getProperties(params.value)
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
const priceOptions = [
  { value: null, label: 'Tất cả' },
  { value: 1, label: 'Dưới 1 triệu' },
  { value: 2, label: '1 - 3 triệu' },
  { value: 3, label: '3 - 5 triệu' },
  { value: 4, label: 'Trên 5 triệu' }
]
const areaOptions = [
  { value: null, label: 'Tất cả' },
  { value: 1, label: 'Dưới 30 m2' },
  { value: 2, label: '30 - 50 m2' },
  { value: 3, label: '50 - 100 m2' },
  { value: 4, label: 'Trên 100 m2' }
]
const projectOptions = [{ value: null, label: 'Tất cả' }]
const priceOrder = ref('Tất cả')
const dateOrder = ref('Tất cả')
const filterVisible = ref(false)
const loading = ref(false);
</script>
<template>
  <div class="mx-10">
    <h1 class="mb-4">Nhà đất phù hợp với bạn</h1>
    <div>
      <div class="flex justify-between mb-3">
        <el-input
          v-model="params.keyword"
          placeholder="Tìm kiếm bất động sản"
          class="!w-1/3"
        ></el-input>
        <div class="relative">
          <el-button @click="filterVisible = !filterVisible">Lọc</el-button>
          <div class="dropdown" v-if="filterVisible">
            <div>
              <div>Dự án:</div>
              <el-select v-model="params.project" filterable placeholder="Select">
                <el-option
                  v-for="item in projectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div>
              <div>Giá:</div>
              <el-select v-model="params.price" placeholder="Select">
                <el-option
                  v-for="item in priceOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div>
              <div>Diện tích:</div>
              <el-select v-model="params.area" filterable placeholder="Select">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-20 mb-3">
        <div>
          <el-radio-group v-model="priceOrder">
            <el-radio-button label="Tất cả" />
            <el-radio-button label="Giá tăng dần" />
            <el-radio-button label="Giá giảm dần" />
          </el-radio-group>
        </div>
        <div>
          <el-radio-group v-model="dateOrder">
            <el-radio-button label="Tất cả" />
            <el-radio-button label="Ngày đăng gần nhất" />
            <el-radio-button label="Ngày đăng lâu nhất" />
          </el-radio-group>
        </div>
      </div>
    </div>
    <grid-card :items="houses" v-loading="loading" />
    <div class="recommend__footer">
      <el-button type="primary">Tải thêm</el-button>
    </div>
  </div>
</template>
<style scoped>
el-dropdown-menu {
  padding: 12px;
}

.slider-demo-block {
  width: 300px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}

.recommend__filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dropdown {
  z-index: 9;
  position: absolute;
  background: rgb(250, 250, 250);
  min-width: 200px;
  width: 250px;
  right: 0;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
