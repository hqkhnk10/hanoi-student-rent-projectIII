<template>
  <div>
    <h1>Dự án</h1>
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
      <el-table-column prop="name" label="Tên dự án" />
      <el-table-column prop="code" label="Mã dự án" width="120" />
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
    <ProjectDialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      :title="title"
      :type="type"
      :id="id"
    ></ProjectDialog>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import { getProject, deleteProject } from '../../../api/project'
import { ElMessage, ElMessageBox } from 'element-plus'
import ProjectDialog from './ProjectDialog.vue'
import { formatDateTime } from '../../../js/format'
onBeforeMount(() => {
  getProjectData()
})
const getProjectData = () => {
  getProject(null)
    .then((res) => {
      tableData.value = res.data.map((res) => ({
        id: res.id,
        code: res.code,
        name: res.name,
        createdAt: res.createdAt,
        createdBy: res.createdBy,
        updatedAt: res.updatedAt,
        updatedBy: res.updatedBy
      }))
    })
    .catch(() => {})
}
const dialogVisible = ref(false)
watch(dialogVisible, () => {
  getProjectData()
})
const title = ref('')
const type = ref(1)
const id = ref(0)
const openDialog = () => {
  dialogVisible.value = true
}
const add = () => {
  openDialog()
  title.value = 'Thêm mới dự án'
  type.value = 1
}
const detail = (ID) => {
  openDialog()
  title.value = 'Chi tiết dự án'
  type.value = 2
  id.value = ID
}
const edit = (ID) => {
  openDialog()
  title.value = 'Sửa dự án'
  type.value = 3
  id.value = ID
}
const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}
const open = (ID) => {
  ElMessageBox.confirm('Bạn có muốn xóa dự án', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(() => {
      deleteProject({ id: ID }).then(() => [getProjectData()])
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
