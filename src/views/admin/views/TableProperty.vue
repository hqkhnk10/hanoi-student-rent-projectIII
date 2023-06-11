<template>
  <div>
    <h1>Bất động sản</h1>
    <div class="header-table">
      <el-button @click="add"
        ><el-icon><Plus /></el-icon>Thêm mới</el-button
      >
      <div>
        <el-input></el-input>
      </div>
      <div>
        <div>
          <el-tag
            v-for="tag in dynamicTags"
            :key="tag"
            class="mx-1"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-dropdown>
            <el-button
              ><el-icon><Filter /></el-icon>Lọc</el-button
            >
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="dynamicTags.push('action')">Action 1</el-dropdown-item>
                <el-dropdown-item @click="dynamicTags.push('action')">Action 2</el-dropdown-item>
                <el-dropdown-item @click="dynamicTags.push('action')">Action 3</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <el-table stripe border :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="description" label="Mô tả" min-width="200" />
      <el-table-column prop="price" label="Giá" width="120" />
      <el-table-column prop="address" label="Địa chỉ" width="200" />
      <el-table-column prop="projectName" label="Dự án" width="200" />
      <el-table-column prop="type" label="Loại bất động sản" width="120">
        <template #default="scope">
          {{ formatPropertyType(scope.row.propertyType) }}
        </template>
      </el-table-column>
      <el-table-column prop="view" label="Lượt xem" width="120" />
      <el-table-column prop="status" label="Trạng thái" width="120">
        <template #default="scope">
          {{ formatPropertyStatus(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="Ngày tạo" width="150">
        <template #default="scope">
          {{ formatDateTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="createdBy" label="Người tạo" width="120" />
      <el-table-column prop="updatedAt" label="Ngày sửa" width="150">
        <template #default="scope">
          {{ formatDateTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedBy" label="Người sửa" width="120" />
      <el-table-column fixed="right" label="Thao tác" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="detail(scope.row.id)">
            <el-icon><View /></el-icon
          ></el-button>
          <el-button link type="primary" size="small" @click="edit(scope.row.id)"
            ><el-icon><EditPen /></el-icon
          ></el-button>
          <el-button link type="primary" size="small" @click="open(scope.row.id)"
            ><el-icon><Delete /></el-icon
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <PropertyDialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      :title="title"
      :type="type"
      :id="id"
    ></PropertyDialog>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import PropertyDialog from './PropertyDialog.vue'
import { getProperties, deleteProperties } from '../../../api/property'
import { formatPropertyStatus, formatDateTime, formatPropertyType } from '../../../js/format'
onBeforeMount(() => {
  getData()
})
const getData = () => {
  getProperties(null)
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
        propertyType: res.propertyType
      }))
    })
    .catch(() => {})
}
const dialogVisible = ref(false)
watch(dialogVisible, () => {
  getData()
})
const title = ref('')
const type = ref(1)
const id = ref(0)
const openDialog = () => {
  dialogVisible.value = true
}
const add = () => {
  openDialog()
  title.value = 'Thêm mới bất động sản'
  type.value = 1
}
const detail = (ID) => {
  openDialog()
  title.value = 'Chi tiết bất động sản'
  type.value = 2
  id.value = ID
}
const edit = (ID) => {
  openDialog()
  title.value = 'Sửa bất động sản'
  type.value = 3
  id.value = ID
}
const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}
const open = (ID) => {
  ElMessageBox.confirm('Bạn có muốn xóa bất động sản', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(() => {
      deleteProperties({ id: ID }).then(() => [getData()])
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Hủy'
      })
    })
}
const tableData = ref([{}])
const dynamicTags = ref([])
</script>

<style>
.header-table {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
