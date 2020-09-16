import React, { Component, Fragment } from "react";
// propTypes
import propTypes from "prop-types";
// antd
import { Modal, message, Form, Input, Button } from "antd";
// api
import { TableList, TableDelete } from "@api/common";
// Table basic component
import TableBasic from "./Table";
class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 请求参数
      pageNumber: 1,
      pageSize: 10,
      keyWord: "",
      // 数据
      data: [],
      //   加载提示
      loadingTable: false,
      // 复选框
      checkBoxValue: [],
      // 页码
      total: 0,
      // 确认弹窗
      modelVisible: false,
      modelconfirmLoading: false,
    };
  }
  componentDidMount() {
    this.loadData();
    // 返回子组件实例
    this.props.onRef(this);
  }
  /**获取列表数据 */
  loadData = () => {
    const { pageNumber, pageSize, keyWord } = this.state;
    // const requestData = {
    //   pageNumber: pageNumber,
    //   pageSize: pageSize,
    // };
    // if (keyWord) {
    //   requestData.name = keyWord;
    // }
    // this.setState({ loadingTable: true });
    // requestData.url = this.props.config.url;

    const requestData = {
      url: this.props.config.url,
      method: "post",
      data: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    };
    // 拼接搜索参数
    if (keyWord) {
      requestData.data.name = keyWord;
    }
    TableList(requestData)
      .then((response) => {
        const resData = response.data.data;
        console.log(resData);
        if (resData.data) {
          this.setState({
            data: resData.data,
            total: resData.total,
            keyWord: "",
          });
        }
        this.setState({ loadingTable: false, keyWord: "" });
      })
      .catch((error) => {
        this.setState({ loadingTable: false, keyWord: "" });
      });
  };
  // 删除
  onHandlerDelete(id) {
    this.setState({
      modelVisible: true,
    });
    if (id) {
      this.setState({
        checkBoxValue: [id],
      });
    }
  }
  // 复选框
  onCheckbox = (value) => {
    this.setState({
      checkBoxValue: value,
    });
  };
  // 当前页码
  onChangeCurrentPage = (value) => {
    console.log(value);
    this.setState(
      {
        pageNumber: value,
      },
      () => {
        this.loadData();
      }
    );
  };
  // 下拉页码
  onChangeSizePage = (value, page) => {
    this.setState(
      {
        pageNumber: 1,
        pageSize: page,
      },
      () => {
        this.loadData();
      }
    );
  };
  /**弹窗 */
  modelThen = () => {
    // 判断是否已选择删除的数据
    if (this.state.checkBoxValue.length === 0) {
      message.info("请选择需要删除的数据");
      return;
    }
    this.setState({ confirmLoading: true });
    const id = this.state.checkBoxValue.join();
    const requestData = {
      url: `${this.props.config.url}Delete`,
      method: "post",
      data: {
        id,
      },
    };
    TableDelete(requestData).then((res) => {
      message.info(res.data.message);
      // 请求数据
      // this.loadData();
      this.setState({
        id: "",
        modelVisible: false,
        modelconfirmLoading: false,
        checkBoxValue: [],
      });
      // 重新加载数据
      this.loadData();
    });
  };
  /**搜索 */
  onFinish = (value) => {
    this.setState({
      keyWord: value.name,
      pageNumber: 1,
      pageSize: 10,
    });
    this.loadData();
  };
  render() {
    const { loadingTable } = this.state;
    const { thead, checkBox, rowKey, batchButton } = this.props.config;
    const rowSelection = {
      onChange: this.onCheckbox,
    };
    return (
      <Fragment>
        <Form layout="inline" onFinish={this.onFinish}>
          <Form.Item label="部门名称" name="name">
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
        {/* table组件 */}
        <div className="table-weap">
          <TableBasic
            columns={thead}
            dataSource={this.state.data}
            total={this.state.total}
            changePageCurrent={this.onChangeCurrentPage}
            changePageSize={this.onChangeSizePage}
            HandlerDelete={() => this.onHandlerDelete}
            rowSelection={checkBox ? rowSelection : null}
            rowKey={rowKey}
          />
        </div>

        {/* 确认弹窗 */}
        <Modal
          title="提示"
          visible={this.state.modelVisible}
          okText="确定"
          cancelText="取消"
          onOk={this.modelThen}
          onCancel={() => this.setState({ modelVisible: false })}
          confirmLoading={this.state.modelconfirmLoading}
        >
          <p className="text-center">
            确定删除此信息？
            <strong className="color-red">删除后将无法恢复！！</strong>
          </p>
        </Modal>
      </Fragment>
    );
  }
}
TableComponent.propTypes = {
  config: propTypes.object,
};
export default TableComponent;
