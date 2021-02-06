import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// antd
import { Button, Switch, message } from "antd";
// api
import { Status } from "../../api/department";
// table 组件
import TableComponent from "@c/tableData/Index";
class DepartmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 请求参数
      pageNumber: 1,
      pageSize: 10,
      keyWord: "",
      // 复选框数据
      selectedRowKeys: [],
      // 表格加载
      loadingTable: false,
      // id
      id: "",
      // 表头
      tableConfig: {
        url: "departmentList",
        checkBox: true,
        rowKey: "id",
        batchButton: true,
        thead: [
          {
            title: "部门名称",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "禁启用",
            dataIndex: "status",
            key: "status",
            render: (text, rowData) => {
              return (
                <Switch
                  checkedChildren="启用"
                  unCheckedChildren="禁用"
                  defaultChecked={rowData.status === "1" ? true : false}
                  onChange={() => this.onHandlerSwitch(rowData)}
                  loading={this.state.id === rowData.id}
                />
              );
            },
          },
          {
            title: "人员数量",
            dataIndex: "number",
            key: "number",
          },
          {
            title: "操作",
            dataIndex: "operation",
            key: "operation",
            width: 215,
            render: (text, rowData) => {
              return (
                <div className="inline-button">
                  <Button type="primary">
                    <Link
                      to={{
                        pathname: "/index/department/add",
                        state: { id: rowData.id },
                      }}
                    >
                      编辑
                    </Link>
                  </Button>
                  <Button onClick={() => this.delete(rowData.id)}>删除</Button>
                  {/* 
                      在父组件获取子组件的实例
                      1、在子组件调用父组件方法，并把子组件实例传给父组件，（已经存储了子组件的实例）
                      2、通过实例调用子组件的方法
                  */}
                </div>
              );
            },
          },
        ],
        formItem: [
          {
            type: "Input",
            label: "部门名称",
            name: "name",
            placeholder: "请输入部门名称",
          },
        ],
      },

      // 表的数据
      data: [],
    };
  }
  /**生命周期挂载完成 */
  componentDidMount() {
    // this.loadData();
  }
  // 获取子组件实例
  getChildRef = (ref) => {
    console.log(ref);
    this.tableComponent = ref; //存储子组件
  };

  /**禁启用 */
  onHandlerSwitch(data) {
    if (!data.status) {
      return false;
    }
    const requestData = {
      id: data.id,
      status: data.status === "1" ? false : true,
    };
    this.setState({ id: data.id });
    Status(requestData)
      .then((res) => {
        message.info(res.data.message);
        this.setState({ id: "" });
      })
      .catch((error) => {
        this.setState({ id: "" });
      });
  }
  // 删除
  delete = (id) => {
    this.tableComponent.onHandlerDelete(id);
  };
  render() {
    return (
      <Fragment>
        <TableComponent
          onRef={this.getChildRef}
          config={this.state.tableConfig}
        />
      </Fragment>
    );
  }
}
export default DepartmentList;
