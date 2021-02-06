import service from "../../src/utils/request";
/**
 * 添加
 */
export function Add(data) {
  return service.request({
    url: "/department/add/",
    method: "POST",
    data, //请求类型为post时
    // params: data, //请求类型为get时
  });
}

/**
 * 删除
 */
export function Delete(data) {
  return service.request({
    url: "/department/delete/",
    method: "POST",
    data, //请求类型为post时
    // params: data, //请求类型为get时
  });
}
/**
 * 禁启用
 */
export function Status(data) {
  return service.request({
    url: "/department/status/",
    method: "POST",
    data, //请求类型为post时
    // params: data, //请求类型为get时
  });
}
/**
 * 详情
 */
export function Detailed(data) {
  return service.request({
    url: "/department/detailed/",
    method: "POST",
    data, //请求类型为post时
    // params: data, //请求类型为get时
  });
}
/**
 * 编辑
 */
export function Edit(data) {
  return service.request({
    url: "/department/edit/",
    method: "POST",
    data, //请求类型为post时
    // params: data, //请求类型为get时
  });
}
