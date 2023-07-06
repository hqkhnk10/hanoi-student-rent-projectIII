<template>
  <div class="m-4">
    <PropertyDialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      :title="title"
      :type="type"
      :id="id"
      :userId="state"
    ></PropertyDialog>
    <el-button @click="add" type="primary">Thêm mới nhà cho thuê</el-button>
    <h1>Danh sách nhà đang cho thuê:</h1>
    <div>
      <div v-for="house in tableData" :key="house" class="house-container">
        <div>
          <el-image :src="house.src" style="width: 300px; height: 200px" fit="cover"></el-image>
        </div>
        <div class="house-content">
          <div class="house-title">{{ house.address }}</div>
          <div class="flex w-full gap-20 ml-6">
            <div>
              <ul style="list-style-type: circle">
                <li>{{ house.description }}</li>
                <li>{{ house.projectName }}</li>
                <li>{{ house.amenities }}</li>
              </ul>
            </div>
            <div>
              <ul style="list-style-type: circle">
                <li>Diện tích: {{ house.area }}m²</li>
                <li>Giá: {{ formatMoney(house.price) }}</li>
                <li>Đăng từ: {{ formatDateTime(house.createdAt) }}</li>
              </ul>
            </div>
          </div>
          <div>
            <span>Trạng thái: </span>
            <span>{{ formatPropertyStatus(house.status) }}</span>
          </div>
        </div>
        <div class="flex justify-center items-center">
          <el-button
            link
            type="primary"
            size="large"
            @click="detail(house.id)"
            class="house-button-icon"
          >
            <el-icon style="width: 30px"><View /></el-icon
          ></el-button>
          <el-button
            link
            type="primary"
            size="large"
            @click="edit(house.id)"
            class="house-button-icon"
            ><el-icon style="width: 30px"><EditPen /></el-icon
          ></el-button>
          <el-button
            link
            type="primary"
            size="large"
            @click="open(house.id)"
            class="house-button-icon"
            ><el-icon style="width: 30px"><Delete /></el-icon
          ></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import { deleteProperties, getProperties } from '../../../../api/property'
import PropertyDialog from '../../../admin/views/PropertyDialog.vue'
import { formatDateTime, formatPropertyStatus, formatMoney } from '../../../../js/format'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
const state = ref(sessionStorage.getItem('id'))
const tableData = ref([])
const dialogVisible = ref(false)
const getData = () => {
  getProperties({ userId: state.value })
    .then((res) => {
      tableData.value = res.data.map((res) => ({
        id: res.id,
        address: res.address,
        area: res.area,
        bedrooms: res.bedrooms,
        createdAt: res.created_at,
        createdBy: res.created_by,
        updatedAt: res.updated_at,
        updatedBy: res.updated_by,
        price: res.price,
        projectName: res.projectName,
        view: res.view,
        description: res.description,
        status: res.status,
        propertyType: res.propertyType,
        amenities: res.amenities,
        userName: res.userName,
        src: `http://127.0.0.1:8080/${res?.imageURL}`
      }))
    })
    .catch(() => {})
}
onBeforeMount(() => {
  getData()
})
const title = ref('')
const type = ref(1)
const id = ref(0)
const add = () => {
  dialogVisible.value = true
  title.value = 'Thêm mới bất động sản'
  type.value = 1
}
const { push } = useRouter()
const detail = (id) => {
  push('/detail-property/' + id)
}
const edit = (ID) => {
  dialogVisible.value = true
  title.value = 'Sửa bất động sản'
  type.value = 3
  id.value = ID
}
const open = (ID) => {
  ElMessageBox.confirm('Bạn có muốn xóa bất động sản', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(() => {
      deleteProperties({ id: ID }).then(() => {
        ElMessage({
          message: 'Xóa thành công',
          type: 'success'
        })
        getData()
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Hủy'
      })
    })
}
watch(dialogVisible, () => {
  getData()
})
</script>

<style scoped>
li {
  line-height: 36px;
}
.house-container {
  height: 250px;
  margin: 20px;
  padding: 12px;
  border: 1px solid gainsboro;
  border-radius: 10px;
  display: flex;
  gap: 12px;
}
.house-content {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-left: 10%;
}
.house-title {
  font-size: larger;
  font-weight: 700;
}
.house-button-icon {
  background: rgb(243, 243, 243);
  border-radius: 10px;
  height: 30px;
  padding: 20px;
}
:deep(.el-icon svg) {
  height: 5em;
  width: 5em;
}
</style>
