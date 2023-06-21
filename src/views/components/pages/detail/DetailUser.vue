<template>
  <div id="user-profile" class="profile">
    <div class="profile-head">
      <div class="container">
        <div class="row">
          <h2 class="content-heading" style="font-size: larger; font-weight: 700">
            Tài khoản của tôi
          </h2>
          <div class="col-md-2">
            <div class="avatar">
              <div class="cover">
                <img
                  src="https://lh3.googleusercontent.com/a/AGNmyxaEVo0KIUY8VAt0620wxlOKZjEzaRaPFj44zFdC=s96-c"
                  alt="Rever"
                  style="opacity: 1"
                />
              </div>
              <a
                href="javascript:document.getElementById('selectAvatar').click()"
                class="change-avatar"
                >Đổi ảnh đại diện</a
              >
              <form method="POST" enctype="multipart/form-data" id="avataForm">
                <input
                  type="file"
                  id="selectAvatar"
                  name="file"
                  accept="image/jpg,image/jpeg,image/png"
                  style="display: none"
                />
              </form>
            </div>
          </div>
          <div class="col-md-10 p-0">
            <div class="row">
              <div class="form-group col-md-6">
                <label for="firstname">Tên đăng nhập</label>
                <input type="text" class="form-control" v-model="user.userName" />
              </div>
              <div class="form-group col-md-6">
                <label for="firstname">Tên</label>
                <input type="text" class="form-control" v-model="user.name" />
                <span class="text-error" style="display: none">Thông tin bắt buộc</span>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-6 phone--group">
                <label for="phone">Số điện thoại</label>
                <div class="input-group mb-3">
                  <input type="text" class="form-control" v-model="user.phone" />
                </div>
              </div>
              <div class="form-group col-md-6">
                <label for="email"
                  >Email
                  <!----></label
                >
                <input type="email" class="form-control" v-model="user.email" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="profile-content">
      <div class="profile-section">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h2 class="font-tiempos title" style="font-size: larger; font-weight: 700">
                Thông tin thêm
                <div class="tooltip">
                  <i class="zmdi zmdi-alert-circle"></i>
                  <span class="tooltiptext right"
                    >Các thông tin cá nhân để Rever hiểu thêm về bạn.</span
                  >
                </div>
              </h2>
            </div>
            <div class="form-group col-md-6 arrow-down">
              <label for="gender">Giới tính</label>
              <div data-v-7cbda427="">
                <i
                  data-v-7cbda427=""
                  class="zmdi zmdi-chevron-down icon-profile__right icon--down"
                ></i>
                <el-select v-model="user.gender" class="w-full">
                  <el-option
                    v-for="gender in genderOptions"
                    :key="gender"
                    :value="gender.value"
                    :label="gender.label"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="form-group col-md-6">
              <i class="zmdi zmdi-calendar icon-profile__right"></i>
              <label for="birthday2">Ngày sinh</label>
              <div class="w-full">
                <el-date-picker
                  v-model="user.dob"
                  format="YYYY/MM/DD"
                  value-format="YYYY-MM-DD"
                ></el-date-picker>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="address">Địa chỉ liên hệ</label>
              <input type="text" placeholder="" class="form-control" v-model="user.address" />
            </div>
          </div>
        </div>
      </div>
      <div class="profile-section extra-info">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2 class="font-tiempos title">
                Nhu cầu nhà đất
                <div class="tooltip">
                  <i class="zmdi zmdi-alert-circle"></i>
                  <span class="tooltiptext right"
                    >Các thông tin về nhu cầu bất động sản của bạn để Rever giới thiệu đến bạn những
                    nhà đất phù hợp nhất.</span
                  >
                </div>
              </h2>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label for="" class="label">Bạn là</label>
              <el-checkbox-group v-model="purpose" class="flex flex-col">
                <el-checkbox label="Người mua" />
                <el-checkbox label="Người Thuê" />
                <el-checkbox label="Người bán" />
                <el-checkbox label="Người cho thuê" />
              </el-checkbox-group>
            </div>
            <div class="col-md-6"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <el-button size="large" type="primary" @click="save">Lưu</el-button>
    </div>
  </div>
</template>
<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { updateUsers, getUserById } from '../../../../api/users'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const id = computed(() => route.params.id)
const genderOptions = ref([
  {
    value: 0,
    label: 'Nữ'
  },
  {
    value: 1,
    label: 'Nam'
  },
  {
    value: 2,
    label: 'Khác'
  }
])
const user = ref({})
const purpose = ref([])
const getDataUser = () => {
  getUserById({ Id: id.value }).then((res) => {
    user.value = res.data[0]
    purpose.value = user.value.purpose.split(',')
  })
}
onBeforeMount(() => {
  getDataUser()
})
const save = () => {
  updateUsers({ ...user.value, purpose: purpose.value.toString() })
    .then(() => {
      ElMessage({
        message: 'Lưu thành công',
        type: 'success'
      })
    })
    .catch(() => {
      ElMessage({
        message: 'Lưu thất bại',
        type: 'error'
      })
    })
}
</script>
<style scoped>
:deep(.el-input__wrapper) {
  width: 100%;
}
</style>
