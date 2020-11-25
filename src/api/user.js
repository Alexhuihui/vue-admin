/*
 * @Author: chenyuechen
 * @Date: 2020-11-19 17:52:31
 * @Description:
 */
import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName } from '@/config'

export async function login(data) {
  if (loginRSA) {
    data = await encryptedData(data)
  }
  return request.post('/auth-server/oauth/token', data)
}

export function getUserInfo() {
  return request.get('/novel-subscription-user/getMyUserInfo/roles')
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}
