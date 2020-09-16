import service from "../../src/utils/request";
/**
 * 获取列表
 */
export function TableList(params) {
  return service.request({
    url: params.url,
    method: params.method || "post",
    data: params.data, //请求类型为post时
  });
}
/**
 * 删除列表
 */
export function TableDelete(params) {
  return service.request({
    url: params.url,
    method: params.method || "post",
    data: params.data, //请求类型为post时
  });
}
/**
 * 公用
 */
export function requestData(params) {
  return service.request({
    url: params.url,
    method: params.method || "post",
    data: params.data, //请求类型为post时
  });
}
