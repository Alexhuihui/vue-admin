import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/novel-subscription-user/admin/magazine/queryAllOrder',
    method: 'post',
    data,
  })
}

export function doEdit(data) {
  return request({
    url: '/novel-subscription-user/admin/magazine/updateOrder',
    method: 'put',
    data,
  })
}

export function doAdd(data) {
  return request({
    url: '/novel-subscription-user/admin/magazine/addOrder',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/novel-subscription-user/admin/magazine/deleteOrder/' + data,
    method: 'delete',
  })
}

export function getOrderDetail(data) {
  return request({
    url: '/novel-subscription-user/admin/magazine/queryOrder/' + data,
    method: 'get',
  })
}
