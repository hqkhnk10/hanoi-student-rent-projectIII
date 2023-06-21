<template>
  <el-dialog
    :modelValue="modelValue"
    :title="props.title"
    :show-close="false"
    destroy-on-close
    width="80%"
  >
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      status-icon
      :disabled="disabled"
      class="flex"
    >
      <div>
        <el-form-item label="Địa chỉ" prop="address" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Nội thất" prop="amenities" :label-width="formLabelWidth">
          <el-input v-model="form.amenities" autocomplete="off" />
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
        <el-form-item label="Loại bất động sản" prop="type" :label-width="formLabelWidth">
          <el-select
            v-model="form.type"
            filterable
            default-first-option
            :reserve-keyword="false"
            placeholder="Loại"
            class="w-full"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="Chi tiết" prop="description" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Tên dự án" prop="project" :label-width="formLabelWidth">
          <el-select
            v-model="form.project"
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="Dự án"
          >
            <el-option
              v-for="item in projectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Chủ nhà"
          prop="userId"
          :label-width="formLabelWidth"
          v-if="userId == 0"
        >
          <el-select
            v-model="form.userId"
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="Chủ nhà"
            class="w-full"
            style="line-height: 32px"
          >
            <el-option
              v-for="item in userOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Lượt xem" prop="view" :label-width="formLabelWidth">
          <el-input v-model="form.view" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="Trạng thái" prop="status" :label-width="formLabelWidth">
          <el-select
            v-model="form.status"
            class="w-full"
            placeholder="Select"
            style="line-height: 32px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Tổng quan" :label-width="formLabelWidth">
          <textarea
            v-model="form.overview"
            style="border: 1px solid gray"
            class="w-full"
          ></textarea>
        </el-form-item>
        <el-form-item label="Ảnh" prop="fileList" :label-width="formLabelWidth">
          <el-upload
            v-model:file-list="fileList"
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Hủy</el-button>
        <el-button type="primary" @click="confirm" :disabled="type == 2"> Xác nhận </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
<script lang="ts" setup>
import { FormRules } from 'element-plus'
import { onBeforeMount, reactive, ref, watch } from 'vue'
import { postProperties, getPropertyById, putProperties } from '../../../api/property'
import { getProject } from '../../../api/project'
import { getUsers } from '../../../api/users'
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
  },
  userId: {
    type: Number,
    default: null
  }
})
onBeforeMount(() => {
  getProject(null).then((res) => {
    projectOptions.value = res.data.map((option) => ({
      label: option.name,
      value: option.id
    }))
  })
  getUsers(null).then((res) => {
    userOptions.value = res.data.map((option) => ({
      label: option.name,
      value: option.id
    }))
  })
  form.value.userId = props.userId
})
const typeOptions = [
  {
    value: 1,
    label: 'Căn hộ'
  },
  {
    value: 2,
    label: 'Nhà phố'
  },
  {
    value: 3,
    label: 'Đất nền'
  },
  {
    value: 4,
    label: 'Chung cư'
  }
]
const userOptions = ref<any[]>([])
const projectOptions = ref<any[]>([])
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
const fileList = ref([])

const disabled = ref(false)
const emits = defineEmits(['update:modelValue'])
const formLabelWidth = '140px'
const form = ref({
  address: '',
  area: null,
  bedrooms: null,
  type: null,
  created_at: '',
  created_by: '',
  description: '',
  living_rooms: '',
  price: null,
  status: '',
  view: null,
  amenities: '',
  project: '',
  userId: 0,
  overview: '',
  files: []
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
  type: [
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
  project: [
    {
      required: true,
      message: 'Không được để trống',
      trigger: 'change'
    }
  ],
  userId: [
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
      getPropertyById({ id: props.id }).then((res) => {
        form.value = res.data
        form.value.project = res.data.projectName
        form.value.userId = res.data.user_id
        form.value.type = res.data.propertyType
        fileList.value = res.data.imageList ?? []
        console.log('form.value', form.value)
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
  console.log('files', form.value.files)

  const valid = submitForm(ruleFormRef.value)
  if (!valid) {
    return
  }
  switch (props.type) {
    case 1:
      var params = formatFormData(form.value)
      postProperties(params).then(() => {
        closeDialog()
      })
      break
    case 3:
      putProperties(formatFormData(form.value)).then(() => {
        closeDialog()
      })
      break
    default:
      break
  }
}
watch(
  () => fileList.value,
  () => {
    form.value.files = fileList.value.map((file) => file['raw'] ?? null)
  }
)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
</script>
<style scoped>
:deep(.el-input__wrapper){
  height: 32px;
}
</style>
