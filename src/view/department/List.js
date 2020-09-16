import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// antd
import { Button, Switch, message } from "antd";
// api
import { Status } from "../../api/department";
// table 组件
import TableComponent from "@c/tableData/Index";
// url
import requestUrl from "@api/requestUrl";
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
        url: requestUrl.departmentList,
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
                  loading={this.state.id == rowData.id}
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
                </div>
              );
            },
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
    const { columns, data, visible, confirmLoading, loadingTable } = this.state;
    const rowSelection = {
      onChange: this.onCheckbox,
    };
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
