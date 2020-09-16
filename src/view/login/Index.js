import React from "react";
// css
import "./index.scss";

// 组件
import LoginFrom from "./LoginFrom";
import RegisterFrom from "./RegisterFrom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromType: "login",
    };
  }

  switchFrom = (value) => {
    this.setState({
      fromType: value,
    });
    console.log(value);
  };

  render() {
    return (
      <div className="from-wrap">
        <div>
          {this.state.fromType === "login" ? (
            <LoginFrom switchFrom={this.switchFrom}></LoginFrom>
          ) : (
            <RegisterFrom switchFrom={this.switchFrom}></RegisterFrom>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
