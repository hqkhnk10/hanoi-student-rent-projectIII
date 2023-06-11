import { defineStore } from 'pinia'
import { loginAPI } from '../api/login'

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => ({
    name: 'name',
    token: 'token',
    role: 0,
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
        this.accountId = res.accountId

        localStorage.setItem('token', JSON.stringify(this.token))
        localStorage.setItem('accountId', JSON.stringify(this.accountId))
      })
    }
  }
})
