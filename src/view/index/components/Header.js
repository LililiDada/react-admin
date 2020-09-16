import React, { Component, Fragment } from "react";
// antd icon
import { MenuFoldOutlined } from "@ant-design/icons";
// css
import "./aside.scss";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleMenu = () => {
    this.props.toggle();
  };

  render() {
    return (
      <Fragment>
        <div className="header-wrap">
          <span className="collapsed-icon" onClick={this.toggleMenu}>
            <MenuFoldOutlined />
          </span>
        </div>
      </Fragment>
    );
  }
}

export default Header;
