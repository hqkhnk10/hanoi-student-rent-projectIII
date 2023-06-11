<template>
  <el-dialog :modelValue="modelValue" :title="props.title" :show-close="false" destroy-on-close>
    <el-form ref="ruleFormRef" :model="form" :rules="rules" status-icon :disabled="disabled">
      <el-form-item label="Địa chỉ" prop="address" :label-width="formLabelWidth">
        <el-input v-model="form.address" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Diện tích" prop="area" :label-width="formLabelWidth">
        <el-input type="number" v-model="form.area" autocomplete="off">
          <template #suffix> m2 </template>
        </el-input>
      </el-form-item>
      <el-form-item label="Số phòng ngủ" prop="bedrooms" :label-width="formLabelWidth">
        <el-input type="number" v-model="form.bedrooms" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Số phòng khách" prop="living_rooms" :label-width="formLabelWidth">
        <el-input type="number" v-model="form.living_rooms" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Giá" prop="price" :label-width="formLabelWidth">
        <el-input type="number" v-model="form.price" autocomplete="off">
          <template #suffix> VND </template>
        </el-input>
      </el-form-item>
      <el-form-item label="Chi tiết" prop="description" :label-width="formLabelWidth">
        <el-input v-model="form.description" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Lượt xem" prop="view" :label-width="formLabelWidth">
        <el-input v-model="form.view" autocomplete="off" :disabled="true" />
      </el-form-item>
      <el-form-item label="Trạng thái" prop="status" :label-width="formLabelWidth">
        <el-select v-model="form.status" class="m-2" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
import { postProperties, getPropertyById, putProperties } from '../../../api/property'
import { formatFormData } from '../../../js/format'

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
const options = ref([
  {
    value: 0,
    label: 'Đã giao dịch'
  },
  {
    value: 1,
    label: 'Sẵn sàng giao dịch'
  }
])
const ruleFormRef = ref()

const disabled = ref(false)
const emits = defineEmits(['update:modelValue'])
const formLabelWidth = '140px'
const form = ref({
  address: '',
  area: null,
  bedrooms: null,
  created_at: '',
  created_by: '',
  description: '',
  living_rooms: '',
  price: null,
  status: '',
  view: null
})
const rules = reactive<FormRules>({
  address: [
    {
      required: true,
      message: 'Không được để trống',
      trigger: 'change'
    }
  ],
  price: [
    {
      required: true,
      message: 'Không được để trống',
      trigger: 'change'
    }
  ],
  area: [
    {
      required: true,
      message: 'Không được để trống',
      trigger: 'change'
    }
  ],
  status: [
    {
      required: true,
      message: 'Không được để trống',
      trigger: 'change'
    }
  ],
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
      getPropertyById({ id: props.id }).then((res) => {
        form.value = res.data
      })
    }
  },
  { immediate: true }
)
const submitForm = async (formEl) => {
  if (!formEl) {
    return false
  }
  await formEl.validate((valid) => {
    if (valid) {
      return true
    } else {
      return false
    }
  })
}
const confirm = () => {
  const valid = submitForm(ruleFormRef.value)
  if(!valid){
    return 
  }
  switch (props.type) {
    case 1:
      var params = formatFormData(form.value);
      postProperties(params).then(() => {
        closeDialog()
      })
      break
    case 3:
      putProperties(form.value).then(() => {
        closeDialog()
      })
      break
    default:
      break
  }
}
</script>