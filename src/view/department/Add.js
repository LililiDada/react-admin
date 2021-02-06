import React from "react";
// antd
import { message } from "antd";
// API
import { Add, Detailed, Edit } from "../../api/department";
// 组件
import FromCom from "@c/from/Index";
class DepartmentAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromLayout: {
        labelCol: { xs: { span: 24 }, sm: { span: 5 }, lg: { span: 3 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 18 }, lg: { span: 22 } },
      },
      loading: false,
      id: "",
      fromConfig: {
        url: "departmentAdd",
        initValue: {
          number: 0,
          status: true,
        },
        setFieldValue: {},
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
            { label: "启用", value: true },
            { label: "禁用", value: false },
          ],
        },
        {
          type: "TextArea",
          label: "描述",
          name: "content",
          required: true,
          placeholder: "请输入描述内容",
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
      // console.log(res);
      // this.refs.from.setFieldValue(res.data.data);
      this.setState({
        fromConfig: {
          ...this.state.fromConfig,
          setFieldValue: res.data.data,
        },
      });
    });
  };
  // onSubmit = (value) => {
  //   console.log(value);
  //   if (!value.name) {
  //     message.error("部门名称不能为空");
  //     return false;
  //   }
  //   if (!value.number || value.number === 0) {
  //     message.error("人员数量不能为0");
  //     return false;
  //   }
  //   if (!value.content) {
  //     message.error("部门描述不能为空");
  //     return false;
  //   }
  //   // 确定按钮执行添加或编辑
  //   this.state.id ? this.onHandlerEdit(value) : this.onHandlerAdd(value);
  // };
  /**添加信息 */
  onHandlerAdd = (value) => {
    Add(value)
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
  // 提交表单
  onHandlerSubmit = (value) => {
    this.state.id ? this.onHandlerEdit(value) : this.onHandlerAdd(value);
  };
  render() {
    return (
      <div>
        <FromCom
          fromItem={this.state.fromItem}
          fromLayout={this.state.fromLayout}
          fromConfig={this.state.fromConfig}
          submit={this.onHandlerSubmit}
        />
      </div>
    );
  }
}
export default DepartmentAdd;
