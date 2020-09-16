import React from "react";
// antd
import { Form, Input, InputNumber, Button, Radio, message } from "antd";
// API
import { DepartmentAddApi, Detailed, Edit } from "../../api/department";
// 组件
import FromCom from "@c/from/Index";
class DepartmentAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromLayout: {
        labelCol: { xs: { span: 24 }, sm: { span: 5 }, lg: { span: 2 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 18 }, lg: { span: 22 } },
      },
      loading: false,
      id: "",
      fromConfig: {
        url: "departmentAdd",
      },
      fromItem: [
        {
          type: "Input",
          label: "部门名称",
          name: "name",
          required: true,
          style: { width: "200px" },
          placeholder: "请输入部门名称",
        },
        {
          type: "InputNumber",
          label: "人员数量",
          name: "number",
          required: true,
          min: 0,
          max: 100,
          style: { width: "200px" },
          placeholder: "请输入人员数量",
        },
        {
          type: "Radio",
          label: "禁启用",
          name: "status",
          required: true,
          options: [
            { label: "禁用", value: false },
            { label: "启用", value: true },
          ],
        },
        {
          type: "Select",
          label: "部门",
          name: "",
          required: true,
          options: [
            { label: "研发部", value: "a" },
            { label: "行政部", value: "b" },
          ],
          style: { width: "150px" },
          placeholder: "请选择部门",
        },
      ],
    };
  }
  componentWillMount() {
    if (this.props.location.state) {
      this.setState({
        id: this.props.location.state.id,
      });
    }
  }
  componentDidMount() {
    this.getDetailed();
  }
  getDetailed = () => {
    if (!this.props.location.state) {
      return false;
    }
    Detailed({ id: this.state.id }).then((res) => {
      console.log(res);
      this.refs.from.setFieldsValue(res.data.data);
    });
  };
  onSubmit = (value) => {
    console.log(value);
    return false;
    if (!value.name) {
      message.error("部门名称不能为空");
      return false;
    }
    if (!value.number || value.number === 0) {
      message.error("人员数量不能为0");
      return false;
    }
    if (!value.content) {
      message.error("部门描述不能为空");
      return false;
    }
    // 确定按钮执行添加或编辑
    this.state.id ? this.onHandlerEdit(value) : this.onHandlerAdd(value);
  };
  /**添加信息 */
  onHandlerAdd = (value) => {
    DepartmentAddApi(value)
      .then((res) => {
        const data = res.data;
        message.info(data.message);
        this.setState({
          loading: false,
        });
        // 重置表单
        this.refs.from.resetFields();
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
  };
  /**编辑信息 */
  onHandlerEdit = (value) => {
    const requestData = value;
    requestData.id = this.state.id;
    Edit(requestData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
  };
  render() {
    return (
      <div>
        <FromCom
          fromItem={this.state.fromItem}
          fromLayout={this.state.fromLayout}
          fromConfig={this.state.fromConfig}
        />
        <Form
          {...this.state.fromLayout}
          initialValues={{ status: true, number: 0 }}
          onFinish={this.onSubmit}
          ref="from"
        >
          <Form.Item label="部门名称" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="人员数量" name="number">
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item label="禁启用" name="status">
            <Radio.Group>
              <Radio value={true}>启用</Radio>
              <Radio value={false}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="描述" name="content">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.state.loading}
            >
              确定
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default DepartmentAdd;
