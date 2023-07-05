<template>
  <div>
    <h1>Duyệt</h1>
    <div class="header-table">
      <el-button style="visibility: hidden" @click="add"
        ><el-icon><Plus /></el-icon>Thêm mới</el-button
      >
      <div>
        <el-button @click="approveAll">Duyệt {{ selected.length }} đã chọn</el-button>
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
    <el-table stripe border :data="tableData" style="width: 100%" ref="multipleTableRef">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="address" label="Bất động sản">
        <template #default="scope">
          <el-button link @click="getDetailProperty(scope.row.property_id)">{{
            scope.row.address
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="Ngày tạo" width="150">
        <template #default="scope">
          {{ formatDateTime(scope.row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="createdBy" label="Người tạo" width="120" />
      <el-table-column prop="updated_at" label="Ngày sửa" width="150">
        <template #default="scope">
          {{ formatDateTime(scope.row.updated_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="updated_by" label="Người sửa" width="120" />
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
import { computed, onBeforeMount, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import PropertyDialog from './PropertyDialog.vue'
import { approveAllAPI, approveAPI } from '../../../api/approve'
import { formatDateTime } from '../../../js/format'
import { getProperties } from '../../../api/property'
import { ElTable } from 'element-plus'
onBeforeMount(() => {
  getData()
})
const multipleTableRef = ref()
const selected = computed(() => {
  if (multipleTableRef.value) {
    return multipleTableRef.value.getSelectionRows()
  } else {
    return []
  }
})
const getDetailProperty = (ID) => {
  id.value = ID
  dialogVisible.value = true
  type.value = 2
}
const getData = () => {
  getProperties({ Status: 2 })
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
        ElMessage({ type: 'success', message: 'Duyệt thành công' })
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

const approveAll = () => {
  const listId = selected.value.map((row) => row.id)
  approveAllAPI({ Id: listId, IsApproved: 1 }).then(() => {
    ElMessage({ type: 'success', message: 'Duyệt thành công' })
    getData()
  })
}
</script>

<style>
.header-table {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
