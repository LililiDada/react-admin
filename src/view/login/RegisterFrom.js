import React from "react";
// 组件
import { Form, Input, Button, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
// 验证
import { validate_pass } from "../../utils/validate";
// 组件
import Code from "../../components/code/index";
// API
import { Register } from "../../api/account";
// 加密
import CryptoJs from "crypto-js";
class RegisterFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      code: "",
      module: "register",
    };
  }

  // input输入处理
  inputChangeUsername = (e) => {
    let value = e.target.value;
    this.setState({
      username: value,
    });
  };
  inputChangePassword = (e) => {
    let value = e.target.value;
    this.setState({
      password: value,
    });
  };
  inputChangeCode = (e) => {
    let value = e.target.value;
    this.setState({
      code: value,
    });
  };

  onFinish = (values) => {
    const requestData = {
      username: this.state.username,
      password: CryptoJs.MD5(this.state.password).toString(),
      code: this.state.code,
    };
    console.log(requestData);
    Register(requestData)
      .then((res) => {
        const data = res.data;
        message.success(data.message);
        if (data.resCode === 0) {
          this.toggleform();
        }
      })
      .catch((error) => {});
  };

  toggleform = () => {
    this.props.switchFrom("login");
  };

  render() {
    const { username, module } = this.state;
    return (
      <div>
        <div className="from-header">
          <h4 className="column">注册</h4>
          <span onClick={this.toggleform}>登录</span>
        </div>
        <div className="form-content">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "邮箱不能为空！" },
                { type: "email", message: "邮箱格式不正确" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入邮箱"
                onChange={this.inputChangeUsername}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "密码不能为空！！" },
                ({ getFieldValue }) => ({
                  validator(role, value) {
                    let passwords_value = getFieldValue("passwords"); //获取再次输入密码
                    if (!validate_pass(value)) {
                      return Promise.reject("请输入大于6位小于20位的数字+字母");
                    }
                    if (passwords_value && value !== passwords_value) {
                      return Promise.reject("两次密码不一致！");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="请输入密码"
                type="password"
                onChange={this.inputChangePassword}
              />
            </Form.Item>
            <Form.Item
              name="passwords"
              rules={[
                { required: true, message: "再次确认密码不能为空！" },
                ({ getFieldValue }) => ({
                  validator(role, value) {
                    if (getFieldValue("password"))
                      if (value !== getFieldValue("password")) {
                        return Promise.reject("两次密码不一致");
                      }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="请再次输入密码"
                type="password"
              />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                { required: true, message: "请输入长度为6位的验证码", len: 6 },
              ]}
            >
              <Row gutter={13}>
                <Col span={15}>
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="请输入验证码"
                    onChange={this.inputChangeCode}
                  />
                </Col>
                <Col span={9}>
                  <Code username={username} module={module} />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default RegisterFrom;
