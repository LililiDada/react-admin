import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
// antd
import { Menu } from "antd";
// 路由
import Router from "../../router/index";
const { SubMenu } = Menu;
class AsideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      openKeys: [],
    };
  }

  componentDidMount() {
    const pathname = this.props.location.pathname;
    const menuKey = pathname.split("/").slice(0, 3).join("/");
    const menuHigh = {
      selectedKeys: pathname,
      openKeys: menuKey,
    };
    this.selectMenuHigh(menuHigh);
  }

  // 选定菜单
  selectMenu = ({ item, key, keyPath, domEvent }) => {
    const menuHigh = {
      selectedKeys: key,
      openKeys: keyPath[keyPath.length - 1], //数组的长度减一，即数组的最后一项
    };
    this.selectMenuHigh(menuHigh);
  };
  openMenu = (openKeys) => {
    this.setState({
      openKeys: [openKeys[openKeys.length - 1]],
    });
  };

  /**菜单高光 */
  selectMenuHigh = ({ selectedKeys, openKeys }) => {
    this.setState({
      selectedKeys: [selectedKeys],
      openKeys: [openKeys],
    });
  };

  //   无子级菜单处理
  renderMenu = ({ title, key }) => {
    return (
      <Menu.Item key={key}>
        <Link to={key}>{title}</Link>
      </Menu.Item>
    );
  };

  //   子级菜单处理
  renderSubMenu = ({ title, key, child }) => {
    return (
      <SubMenu title={title} key={key}>
        {child &&
          child.map((item) => {
            return item.child && item.child.length > 0
              ? this.renderSubMenu(item)
              : this.renderMenu(item);
          })}
      </SubMenu>
    );
  };

  render() {
    const { selectedKeys, openKeys } = this.state;
    return (
      <Fragment>
        <h1 className="logo">
          <span>LOGO</span>
        </h1>
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          mode="inline"
          onOpenChange={this.openMenu}
          onClick={this.selectMenu}
        >
          {Router &&
            Router.map((firstItem) => {
              return firstItem.child && firstItem.child.length > 0
                ? this.renderSubMenu(firstItem)
                : this.renderMenu(firstItem);
            })}
        </Menu>
      </Fragment>
    );
  }
}

export default withRouter(AsideMenu);