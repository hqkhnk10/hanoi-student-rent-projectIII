import { defineStore } from 'pinia'
import { loginAPI } from '../api/login'
import { ElMessage } from 'element-plus'

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => ({
    name: 'name',
    token: 'token',
    role: -1,
    accountId: 0
  }),
  getters: {
    getToken() {
      return this.token
    },
    getName() {
      return this.name
    },
  },
  actions: {
    async login(data) {
      return await loginAPI(data).then((res)=>{
        this.name = res.name
        this.token = res.token
        this.role = res.role
        this.accountId = res.id

        localStorage.setItem('token', JSON.stringify(this.token))
        sessionStorage.setItem("id", res.id);
                ElMessage({
          message: 'Đăng nhập thành công',
          type: 'success'
        })
      }).catch(()=>{
        ElMessage.error('Tên đăng nhập hoặc mật khẩu không đúng')
      })
    }
  }
})
