/*
 * @Author: chenyuechen
 * @Date: 2020-11-19 17:52:31
 * @Description:
 */
/**
 * @description 导出默认网路配置
 **/
const network = {
  //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  //消息框消失时间
  messageDuration: 3000,
  //最长请求时间
  requestTimeout: 60000,
  //操作正常code，支持String、Array、int多种类型
  successCode: [100, 101],
  //登录失效code
  invalidCode: 401,
  //无权限code
  noPermissionCode: 403,
}
module.exports = network
