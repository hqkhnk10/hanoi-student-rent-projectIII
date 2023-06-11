<template>
  <div>
    <h1>Dự án</h1>
    <div class="header-table">
      <el-button
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
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="userName" label="userName" width="120" />
      <el-table-column prop="email" label="email" width="200" />
      <el-table-column prop="phone" label="phone" width="150" />
      <el-table-column prop="roles" label="roles" width="120" />
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
    <UserDialog v-if="dialogVisible" v-model="dialogVisible" :title="title" :type="type" :id="id"></UserDialog>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import { getUsers, deleteUsers } from '../../../api/users'
import { ElMessage, ElMessageBox } from 'element-plus'
import UserDialog from './UserDialog.vue'
onBeforeMount(() => {
  getUserData()
})
const getUserData =() =>{
  getUsers(null)
    .then((res) => {
      tableData.value = res.data.map((res) => ({
        id: res.id,
        userName: res.userName,
        name: res.name,
        email: res.email,
        password: res.password,
        phone: res.phone,
        roles: res.roles
      }))
    })
    .catch(() => {})
}
const dialogVisible = ref(false)
watch(dialogVisible, () =>{
  getUserData()
})
const title = ref('')
const type = ref(1)
const id = ref(0)
const openDialog = () =>{
  dialogVisible.value = true
}
const add = () =>{
  openDialog()
  title.value = "Thêm mới người dùng"
  type.value = 1;
}
const detail = (ID)=>{
  openDialog()
  title.value = "Chi tiết người dùng"
  type.value = 2;
  id.value = ID
}
const edit = (ID)=>{
  openDialog()
  title.value = "Sửa người dùng"
  type.value = 3;
  id.value = ID
}
const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}
const open = (ID) => {
  ElMessageBox.confirm('Bạn có muốn xóa người dùng', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(() => {
      deleteUsers({id: ID}).then(()=>[
        getUserData()
      ])
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Hủy'
      })
    })
}
const tableData = ref([{}])
const dynamicTags = ref([]);
</script>
<style>
.header-table {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
