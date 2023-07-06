<script setup>
import { useRouter } from 'vue-router'
import { getProperties } from '../../../api/property'
import gridCard from '../../../components/grid-card.vue'
import { onBeforeMount, ref, watch } from 'vue'
import { getProject } from '../../../api/project'

const params = ref({
  price: null,
  area: null,
  ProjectId: null,
  keyword: null,
  status: 1,
  Order_By_Price: null,
  Order_By_Date: null,
  Min_Price: null,
  Max_Price: null,
  Min_Area: null,
  Max_Area: null
})
const houses = ref([])
const getPropertiesAPI = () => {
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
}
watch(
  () => params.value,
  () => {
    getPropertiesAPI()
  },
  { immediate: true, deep: true }
)
const priceOptions = [
  { value: null, label: 'Tất cả' },
  { value: 1, label: 'Dưới 1 triệu' },
  { value: 2, label: '1 - 3 triệu' },
  { value: 3, label: '3 - 5 triệu' },
  { value: 4, label: 'Trên 5 triệu' }
]
const areaOptions = [
  { value: null, label: 'Tất cả' },
  { value: 1, label: 'Dưới 30 m²' },
  { value: 2, label: '30 - 50 m²' },
  { value: 3, label: '50 - 100 m²' },
  { value: 4, label: 'Trên 100 m²' }
]
const projectOptions = ref([])
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

onBeforeMount(() => {
  getProject().then((res) => {
    projectOptions.value = res.data
  })
  console.log('res', projectOptions.value);
})

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

const priceChange = (e) => {
  switch (e) {
    case 1:
      params.value.Min_Price = 0
      params.value.Max_Price = 1000000
      break
    case 2:
      params.value.Min_Price = 1000000
      params.value.Max_Price = 3000000
      break
    case 3:
      params.value.Min_Price = 3000000
      params.value.Max_Price = 5000000
      break
    case 4:
      params.value.Min_Price = 5000000
      params.value.Max_Price = null
      break
    case null:
      params.value.Min_Price = null
      params.value.Max_Price = null
      break
    default:
      break
  }
}
const changeArea = (e) => {
  switch (e) {
    case 1:
      params.value.Min_Area = 0
      params.value.Max_Area = 30
      break
    case 2:
      params.value.Min_Area = 30
      params.value.Max_Area = 50
      break
    case 3:
      params.value.Min_Area = 50
      params.value.Max_Area = 100
      break
    case 4:
      params.value.Min_Area = 100
      params.value.Max_Area = null
      break
    case null:
      params.value.Min_Area = null
      params.value.Max_Area = null
      break
    default:
      break
  }
}
</script>
<template>
  <div class="m-4">
    <div class="flex justify-between items-center">
      <div>
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
      </div>
      <div>
        <el-select v-model="params.Order_By_Price" class="m-2" placeholder="Sắp xếp giá" clearable>
          <el-option
            v-for="item in priceOrder"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>

    <div class="">
      <div class="flex justify-between items-center">
        <div class="flex gap-4 ml-6">
          <div>
            <div>Dự án:</div>
            <el-select
              v-model="params.ProjectId"
              filterable
              clearable
              placeholder="Tất cả"
              style="width: 100px"
            >
              <el-option
                v-for="item in projectOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
          <div>
            <div>Giá:</div>
            <el-select
              v-model="params.price"
              placeholder="Select"
              @change="priceChange"
              style="width: 100px"
            >
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
            <el-select
              v-model="params.area"
              filterable
              placeholder="Select"
              style="width: 100px"
              @change="changeArea"
            >
              <el-option
                v-for="item in areaOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div>
          <el-select
            v-model="params.Order_By_Date"
            class="m-2"
            placeholder="Sắp xếp theo ngày"
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
      </div>
      <el-divider />
    </div>
    <div>
      <div>
        <grid-card :items="houses" v-loading="loading" v-if="houses.length > 0" />
        <div v-else>Không có nhà trọ phù hợp</div>
      </div>
    </div>
    <div class="recommend__footer"></div>
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
