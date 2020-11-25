/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */

import Vue from 'vue'
import { getUserInfo, login, logout } from '@/api/user'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/utils/accessToken'
import { resetRouter } from '@/router'
import { title, tokenName } from '@/config'

const state = {
  accessToken: getAccessToken(),
  username: '',
  avatar: '',
  roles: [],
  permissions: [],
}
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  roles: (state) => state.roles,
  permissions: (state) => state.permissions,
}
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  setUsername(state, username) {
    state.username = username
  },
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
  setRoles(state, roles) {
    state.roles = roles
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
}
const actions = {
  setPermissions({ commit }, permissions) {
    commit('setPermissions', permissions)
  },
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    var formdata = new FormData()
    formdata.append('client_id', 'javaboy')
    formdata.append('client_secret', '123')
    formdata.append('username', username)
    formdata.append('password', password)
    formdata.append('grant_type', 'password')
    const { access_token } = await login(formdata)
    const accessToken = access_token
    if (accessToken) {
      commit('setAccessToken', accessToken)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
    } else {
      Vue.prototype.$baseMessage(
        `登录接口异常，未正确返回${tokenName}...`,
        'error'
      )
    }
  },
  async getUserInfo({ commit, state }) {
    const { username, roleList } = await getUserInfo()
    if (!username) {
      Vue.prototype.$baseMessage('验证失败，请重新登录...', 'error')
      return false
    }
    let permissions = []
    if (username && roleList && Array.isArray(roleList)) {
      if (
        roleList.findIndex((o) => {
          return o.name == 'ROLE_ADMIN'
        }) > -1
      ) {
        permissions = ['admin']
        commit('setPermissions', permissions)
        commit('setRoles', roleList)
        commit('setUsername', username)
        commit('setAvatar', '')
        return permissions
      } else {
        Vue.prototype.$baseMessage('用户信息接口异常', 'error')
        return false
      }
    } else {
      Vue.prototype.$baseMessage('用户信息接口异常', 'error')
      return false
    }
    // let { permissions, username, avatar } = data
    // if (permissions && username && Array.isArray(permissions)) {
    //   commit('setPermissions', permissions)
    //   commit('setUsername', username)
    //   commit('setAvatar', avatar)
    //   return permissions
    // } else {
    //   Vue.prototype.$baseMessage('用户信息接口异常', 'error')
    //   return false
    // }
  },
  async logout({ dispatch }) {
    // await logout(state.accessToken)
    await dispatch('resetAccessToken')
    await resetRouter()
  },
  resetAccessToken({ commit }) {
    commit('setPermissions', [])
    commit('setAccessToken', '')
    removeAccessToken()
  },
}
export default { state, getters, mutations, actions }
