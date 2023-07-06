<script setup lang="ts">
import { ref } from 'vue'
import { usePermissionStore } from '../../../../stores/permisson'
import { useRouter } from 'vue-router'
import { registerAPI } from '../../../../api/login'
import { ElMessage } from 'element-plus'
const username = ref('')
const name = ref('')
const password = ref('')
const email = ref('')
const sdt = ref('')

const store = usePermissionStore()
const { push } = useRouter()

const login = async () => {
  await store.login({ username: username.value, password: password.value })
  if (store.role == 1) {
    push({ path: '/dashboard' })
  }
  if (store.role == -1) {
    return
  } else {
    push({ path: '/homepage' })
  }
}
const create = ref(true)

const register = () => {
  registerAPI({
    name: name.value,
    username: username.value,
    password: password.value,
    email: email.value,
    phone: sdt.value
  }).then(() => {
    ElMessage({
    message: 'Đăng kí thành công',
    type: 'success',
  })
  create.value = true
  })
}
</script>

<template>
  <div
    class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900"
    @keydown.enter="login"
  >
    <div
      class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800"
    >
      <div class="flex flex-col overflow-y-auto md:flex-row">
        <div class="h-32 md:h-auto md:w-1/2">
          <img
            aria-hidden="true"
            class="object-fill w-full h-full dark:block"
            src="https://photo.rever.vn/v3/get/0bcsxl0uZBw4kUoecFEmDoIZKpcE1ICEVZz6JRQc4RY=/450x300/image.jpg"
            alt="Office"
          />
        </div>
        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2" v-if="create">
          <div class="w-full">
            <h1 class="mb-4 text-xl font-semibold text-gray-700">Login</h1>
            <label class="block text-sm">
              <span class="text-gray-700 dark:text-gray-400">Email</span>
              <el-input v-model="username"></el-input>
            </label>
            <label class="block mt-4 text-sm">
              <span class="text-gray-700 dark:text-gray-400">Password</span>
              <el-input v-model="password" show-password></el-input>
            </label>

            <!-- You should use a button here, as the anchor is only used for the example  -->
            <a
              @click="login"
              class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Log in
            </a>

            <hr class="my-8" />

            <p class="mt-4">
              <a class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                Forgot your password?
              </a>
            </p>
            <p class="mt-1">
              <a
                class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                @click="create = false"
              >
                Create account
              </a>
            </p>
          </div>
        </div>
        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2" v-else>
          <div class="w-full">
            <h1 class="mb-4 text-xl font-semibold text-gray-700">Đăng kí</h1>
            <label class="block text-sm">
              <span class="text-gray-700 dark:text-gray-400">Họ và tên</span>
              <el-input v-model="name"></el-input>
            </label>
            <label class="block text-sm">
              <span class="text-gray-700 dark:text-gray-400">Tên đăng nhập</span>
              <el-input v-model="username"></el-input>
            </label>
            <label class="block mt-4 text-sm">
              <span class="text-gray-700 dark:text-gray-400">Mật khẩu</span>
              <el-input v-model="password" show-password></el-input>
            </label>
            <label class="block mt-4 text-sm">
              <span class="text-gray-700 dark:text-gray-400">Email</span>
              <el-input v-model="email"></el-input>
            </label>
            <label class="block mt-4 text-sm">
              <span class="text-gray-700 dark:text-gray-400">Số điện thoại</span>
              <el-input v-model="sdt"></el-input>
            </label>

            <!-- You should use a button here, as the anchor is only used for the example  -->
            <a
              @click="register"
              class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Đăng kí
            </a>

            <hr class="my-8" />

            <p class="mt-4">
              <a
                class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                @click="create = true"
              >
                Quay lại
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
