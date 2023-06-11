<template>
  <el-dialog :modelValue="modelValue" :title="props.title" :show-close="false" destroy-on-close>
    <el-form :model="form" :rules="rules" status-icon :disabled="disabled">
      <el-form-item label="Tên" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Email" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Số điện thoại" prop="phone" :label-width="formLabelWidth">
        <el-input type="number" v-model="form.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Tên tài khoản" prop="userName" :label-width="formLabelWidth">
        <el-input v-model="form.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Mật khẩu" prop="password" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Hủy</el-button>
        <el-button type="primary" @click="confirm"> Xác nhận </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { FormRules } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import { addUsers, getUserById, updateUsers } from '../../../api/users'
const props = defineProps({
  title: {
    type: String
  },
  type: {
    type: Number,
    default: 1
  },
  modelValue: {
    type: Boolean
  },
  id: {
    type: Number
  }
})
const disabled = ref(false)
const emits = defineEmits(['update:modelValue'])
const formLabelWidth = '140px'
const form = ref({
  name: '',
  email: '',
  phone: null,
  userName: '',
  password: ''
})
const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: 'Không được để trống',
      trigger: 'change'
    }
  ],
  userName: [
    {
      required: true,
      message: 'Không được để trống',
      trigger: 'change'
    }
  ],
  email: [
    {
      required: true,
      message: 'Không được để trống',
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      message: 'Không được để trống',
      trigger: 'change'
    }
  ]
})
const closeDialog = () => {
  emits('update:modelValue', false)
}
watch(
  () => props.type,
  () => {
    if (props.type == 2) {
      disabled.value = true
    }
    if (props.type == 2 || props.type == 3) {
      getUserById({ id: props.id }).then((res) => {
        form.value = res.data[0]
      })
    }
  },
  { immediate: true }
)
const confirm = () => {
  switch (props.type) {
    case 1:
      addUsers(form.value).then(() => {
        closeDialog()
      })
      break
    case 3:
      updateUsers(form.value).then(() => {
        closeDialog()
      })
      break
    default:
      break
  }
}
</script>
