import React, { Component } from "react";
// antd
import { Button, message } from "antd";
import { GetCode } from "../../api/account";
// 验证
import { validate_email } from "../../utils/validate";
// 定时器
let timer;
class Code extends Component {
  constructor(props) {
    //   初始化props的值
    super(props);
    this.state = {
      username: props.username,
      button_text: "获取验证码",
      botton_loading: false,
      button_disabled: false,
      module: props.module,
    };
  }

  componentWillReceiveProps({ username }) {
    this.setState({
      username,
    });
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  // 获取验证码
  getCode = () => {
    const username = this.state.username;
    if (!username) {
      message.warning("用户名不能为空！！", 1);
      return false;
    }
    if (!validate_email(username)) {
      message.warning("邮箱格式不正确", 1);
      return false;
    }
    this.setState({
      botton_loading: true,
      button_text: "发送中",
    });
    const requestData = {
      username,
      module: this.state.module,
    };
    GetCode(requestData)
      .then((response) => {
        message.success(response.data.message);
        // 执行倒计时
        this.countDown();
      })
      .catch((error) => {
        this.setState({
          botton_loading: false,
          button_text: "重新获取",
        });
      });
  };

  /**倒计时 */
  countDown = () => {
    // 倒数计时间
    let sec = 60;
    // 修改状态
    this.setState({
      button_disabled: true,
      button_loading: false,
      button_text: `${sec}s`,
    });

    timer = setInterval(() => {
      sec--;
      if (sec <= 0) {
        this.setState({
          button_text: `重新获取`,
          button_disabled: false,
        });
        clearInterval(timer);
        return false;
      }
      this.setState({
        button_text: `${sec}s`,
      });
    }, 1000);
  };

  render() {
    return (
      <Button
        type="danger"
        block
        onClick={this.getCode}
        // icon={<PoweroffOutlined />}
        loading={this.state.button_loading}
        disabled={this.state.button_disabled}
      >
        {this.state.button_text}
      </Button>
    );
  }
}

export default Code;
