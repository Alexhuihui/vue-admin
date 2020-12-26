import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/novel-subscription-user/admin/magazine/fuzzySearchMagazine',
    method: 'post',
    data,
  })
}

export function doEdit(data) {
  return request({
    url: '/novel-subscription-user/admin/magazine/updateMagazine',
    method: 'put',
    data,
  })
}

export function doAdd(data) {
  return request({
    url: '/novel-subscription-user/admin/magazine/addMagazine',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/novel-subscription-user/admin/magazine/deleteMagazine/' + data,
    method: 'delete',
  })
}

export function getCatList(data) {
  return request({
    url: '/novel-subscription-user/admin/magazine/queryAllCategory',
    method: 'post',
    data,
  })
}

export function sendUpdateMail(data) {
  return request({
    url: '/novel-subscription-user/admin/magazine/sendUpdateMail',
    method: 'post',
    data,
  })
}

export function sendNotifyMail(data) {
  return request({
    url: '/novel-subscription-user/admin/magazine/notifyAllMail',
    method: 'post',
    data,
  })
}

export function getItemList(data) {
  return request({
    url: '/novel-subscription-user/admin/magazine/fuzzySearchMagazine',
    method: 'post',
    data,
  })
}
