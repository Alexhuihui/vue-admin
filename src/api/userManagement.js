/*
 * @Author: chenyuechen
 * @Date: 2020-11-19 17:52:31
 * @Description:
 */
import request from '@/utils/request'

export function getList(data) {
  return request.post(
    '/novel-subscription-user/admin/magazine/fuzzySearchCustomer',
    data
  )
}

export function doEdit(data) {
  return request({
    url: '/novel-subscription-user/admin/magazine/updateCustomer',
    method: 'put',
    data,
  })
}

export function doAdd(data) {
  return request({
    url: '/novel-subscription-user/admin/magazine/addNewCustomer',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/novel-subscription-user/admin/magazine/deleteCustomer/' + data,
    method: 'delete',
  })
}
