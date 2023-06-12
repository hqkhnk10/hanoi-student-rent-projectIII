<template>
  <div>
    <h1>Duyệt</h1>
    <div class="header-table">
        <el-button style="visibility: hidden;;"
         @click="add"><el-icon><Plus /></el-icon>Thêm mới</el-button
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
      <el-table-column prop="address" label="Bất động sản" >
        <template #default="scope">
          <el-button link @click="getDetailProperty(scope.row.property_id)">{{ scope.row.address }}</el-button>
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
          <el-button link type="primary" size="small" @click="approve(scope.row.id, 1)">
            <el-icon><Check /></el-icon>
          </el-button>
          <el-button link type="primary" size="small" @click="approve(scope.row.id, -1)"
            ><el-icon><Close /></el-icon>
          </el-button>
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
import { getApprove, approveAPI } from '../../../api/approve'
import { formatDateTime } from '../../../js/format'
onBeforeMount(() => {
  getData()
})
const getDetailProperty=(ID)=>{
  id.value = ID
  dialogVisible.value = true
  type.value = 2
}
const getData = () => {
  getApprove(null)
    .then((res) => {
      tableData.value = res.data
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

const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}
const approve = (ID, value) => {
  ElMessageBox.confirm('Bạn có duyệt bất động sản', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(() => {
      approveAPI({ id: ID, IsApproved: value }).then(() => {
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
