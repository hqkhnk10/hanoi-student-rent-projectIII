<template>
  <el-dialog
    :modelValue="modelValue"
    :title="props.title"
    :show-close="false"
    destroy-on-close
  >
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      status-icon
      :disabled="disabled"
    >
        <el-form-item label="Tên dự án" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Mã dự án" prop="code" :label-width="formLabelWidth">
          <el-input v-model="form.code" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Ảnh" prop="fileList" :label-width="formLabelWidth">
          <el-upload
            v-model:file-list="fileList"
            action="#"
            :limit="1"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Hủy</el-button>
        <el-button type="primary" @click="confirm"> Xác nhận </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessage, FormRules } from 'element-plus'
import { onBeforeMount, reactive, ref, watch } from 'vue'
import { postProject, getProjectById, putProject } from '../../../api/project'
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
onBeforeMount(() => {

})

const ruleFormRef = ref()
const fileList = ref([])

const disabled = ref(false)
const emits = defineEmits(['update:modelValue'])
const formLabelWidth = '140px'
const form = ref({
  name: '',
  code: '',
  files: []
})
const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: 'Không được để trống',
      trigger: 'change'
    }
  ],
  code: [
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
      getProjectById({ id: props.id }).then((res) => {
        form.value = res.data[0]
        fileList.value = res.data.map(data=> ({url: "http://127.0.0.1:8080/" + data.imageUrl}))
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
      postProject(params).then(() => {
        ElMessage({ type: 'success', message: 'Thêm thành công' })
        closeDialog()
      })
      break
    case 3:
      putProject(formatFormData(form.value)).then(() => {
        ElMessage({ type: 'success', message: 'Sửa thành công' })
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
