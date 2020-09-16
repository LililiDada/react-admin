import React from "react";
import { withRouter } from "react-router-dom";
// 组件
import { Form, Input, Button, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
// 验证  validate_email
import { validate_password } from "../../utils/validate";
// API
import { Login } from "../../api/account";
// 组件
import Code from "../../components/code/index";
// 加密
import CryptoJs from "crypto-js";
// 方法
import { setToken, setUsername } from "../../utils/cookies";
class LoginFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      code: "",
      module: "login",
      loading: false,
      // code_button_loading: false,
      // code_button_text: "获取验证码",
      // code_button_disabled: false,
    };
  }

  // 登录
  onFinish = (values) => {
    const requestData = {
      username: this.state.username,
      password: CryptoJs.MD5(this.state.password).toString(),
      code: this.state.code,
    };
    this.setState({
      loading: true,
    });
    Login(requestData)
      .then((response) => {
        if (response.data.resCode !== 0) {
          message.error(response.data.message);
        }
        this.setState({
          loading: false,
        });
        const data = response.data.data;
        // 存储token
        setToken(data.token);
        setUsername(data.username);
        this.props.history.push("/index");
        console.log(response);
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
    console.log("Received values of form: ", values);
  };

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

  toggleform = () => {
    this.props.switchFrom("register");
  };

  render() {
    const { username, module, loading } = this.state;
    // const _this = this;code_button_disabled
    return (
      <div>
        <div className="from-header">
          <h4 className="column">登录</h4>
          <span onClick={this.toggleform}>账号注册</span>
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
                { required: true, message: "邮箱不能为空" },
                { type: "email", message: "邮箱格式不正确" },
                // ({ getFileValue }) => ({
                //   validator(rule, value) {
                //     if (validate_email(value)) {
                //       _this.setState({
                //         code_button_disabled: false,
                //       });
                //       return Promise.resolve();
                //     }
                //     return Promise.reject("邮箱格式不正确");
                //   },
                // }),
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="email"
                value={username}
                onChange={this.inputChangeUsername}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "密码不能为空" },
                // { min: 6, message: "不能小于6位" },
                // { max: 20, message: "不能大于20位" },
                {
                  pattern: validate_password,
                  message: "请输入大于6位小于20位的数字+字母",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                type="password"
                onChange={this.inputChangePassword}
              />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                { required: true, message: "验证码不能为空" },
                { len: 6, message: "请输入长度为6位的验证码" },
              ]}
            >
              <Row gutter={13}>
                <Col span={15}>
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Code"
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
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginFrom);
