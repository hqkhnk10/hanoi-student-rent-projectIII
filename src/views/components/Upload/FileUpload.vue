<script lang="ts" setup>
import { ref, watch } from 'vue';
import {deleteFile} from '../../../api/file'
const props = defineProps({
  files:{
    type: String
  }
})
const uploadFiles = ref([])
watch(
  () => uploadFiles.value,
  () => {
    // form.value.files = uploadFiles.value.map((file) => file['raw'])
  }
)
const handleRemove = (uploadFile, uploadFiles) => {
  deleteFile()
  console.log(uploadFile, uploadFiles)
}
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
</script>
<template>
  <el-upload
    v-model:file-list="uploadFiles"
    action="#"
    list-type="picture-card"
    :auto-upload="false"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
