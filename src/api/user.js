import service from "../../src/utils/request";
/**
 * 登录接口
 */
export function DepartmentAdd(data) {
  return service.request({
    url: "/department/add/",
    method: "POST",
    data, //请求类型为post时
    // params: data, //请求类型为get时
  });
}
