<script setup>
import { useRouter } from 'vue-router'
import { getProperties } from '../../../api/property'
import gridCard from '../../../components/grid-card.vue'
import { ref, onBeforeMount } from 'vue'

const params = ref({
  price: null,
  area: null,
  project: null,
  keyword: null,
  status: 1,
  Order_By_Price: null,
  Order_By_Date: null,
  Min_Price: null,
  Max_Price: null
})
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
const dateOrder = ref([
  { value: true, label: 'Ngày đăng mới nhất' },
  { value: false, label: 'Ngày đăng cũ nhất' }
])
const loading = ref(false)
const loadingSearch = ref(false)


const priceOrder = ref([
  { value: true, label: 'Giá tăng dần' },
  { value: false, label: 'Giá giảm dần' }
])
const remoteMethod = (query) => {
  loadingSearch.value = true
  getProperties({ keyword: query, status: 1 })
    .then((res) => {
      houseSearch.value = res.data.map((row) => ({
        value: row.id,
        label: row.address,
        description: row?.description,
        address: row.address
      }))
    })
    .finally(() => {
      loadingSearch.value = false
    })
}
const houseSearch = ref([])
const { push } = useRouter()
const detailHouse = (id) => {
  push('detail-property/' + id)
}
</script>
<template>
  <div class="m-4">
    <span class="m-4">Nhà đất phù hợp với bạn</span>
    <el-select
      multiple
      filterable
      remote
      reserve-keyword
      placeholder="Nhập địa điểm, tòa nhà..."
      style="width: 400px"
      no-data-text="Không có căn nhà phù hợp"
      :remote-method="remoteMethod"
      :loading="loadingSearch"
    >
      <el-option
        @click="detailHouse(item.value)"
        v-for="item in houseSearch"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span style="float: left; font-weight: bolder">{{ item.description }}</span>
        <i style="font-size: 12px; padding-left: 4px">{{ item.address }}</i>
      </el-option>
    </el-select>
    <div>
      <div class="flex">
        <div>
          <el-select
            v-model="params.Order_By_Price"
            class="m-2"
            placeholder="Sắp xếp giá"
            size="large"
            clearable
          >
            <el-option
              v-for="item in priceOrder"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select
            v-model="params.Order_By_Date"
            class="m-2"
            placeholder="Sắp xếp theo ngày"
            size="large"
            clearable
          >
            <el-option
              v-for="item in dateOrder"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
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
      <el-divider />
    </div>

    <grid-card :items="houses" v-loading="loading" />
    <div class="recommend__footer">
      <el-button type="primary">Tải thêm</el-button>
    </div>
  </div>
</template>
<style scoped>
.recommend__footer {
  display: flex;
  justify-content: center;
}
.el-dropdown-menu {
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
