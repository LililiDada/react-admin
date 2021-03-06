import React, { Component, Fragment } from "react";
// propTypes
import propTypes from "prop-types";
// antd
import { Table, Row, Col, Pagination, Button } from "antd";
import { connect } from "react-redux";
class TableBasic extends Component {
  render() {
    const { thead } = this.props.config;
    return (
      <Fragment>
        <div className="spacing-30"></div>
        <Table
          rowKey={this.props.rowKey}
          columns={thead}
          bordered
          dataSource={this.props.list}
        ></Table>
        {/* <Row>
          <Col span={8}>
            {batchButton && <Button onClick={HandlerDelete}>批量删除</Button>}
          </Col>
          <Col span={16}>
            <Pagination
              onChange={changePageCurrent}
              onShowSizeChange={changePageSize}
              total={total}
              showSizeChanger
              showQuickJumper
              className="pull-right"
              showTotal={(total) => `Total ${total} items`}
            />
          </Col>
        </Row> */}
      </Fragment>
    );
  }
}
// 校验数据类型
TableBasic.propTypes = {
  config: propTypes.object,
  rowKey: propTypes.string,
};
// 默认
TableBasic.defaultProps = {
  config: {},
  rowKey: "id",
};

const mapStateToProps = (state) => {
  return {
    list: state.department.departmentList,
  };
};

export default connect(mapStateToProps, null)(TableBasic);
