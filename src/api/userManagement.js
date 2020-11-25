/*
 * @Author: chenyuechen
 * @Date: 2020-11-19 17:52:31
 * @Description:
 */
import request from '@/utils/request'

export function getList(data) {
  return request.get(
    '/novel-subscription-user/admin/magazine/fuzzySearchCustomer',
    data
  )
}

export function doEdit(data) {
  return request({
    url: '/userManagement/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/userManagement/doDelete',
    method: 'post',
    data,
  })
}
