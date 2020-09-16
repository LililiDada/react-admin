import React, { Component, Fragment } from "react";
// propTypes
import propTypes from "prop-types";
// antd
import { Table, Row, Col, Pagination, Button } from "antd";
class TableBasic extends Component {
  render() {
    const {
      columns,
      dataSource,
      total,
      changePageCurrent,
      changePageSize,
      batchButton,
      HandlerDelete,
      rowSelection,
      rowKey,
    } = this.props;
    return (
      <Fragment>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowSelection={rowSelection}
          bordered
          rowKey={rowKey}
        ></Table>
        <Row>
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
        </Row>
      </Fragment>
    );
  }
}
// 校验数据类型
TableBasic.propTypes = {
  columns: propTypes.array,
  dataSource: propTypes.array,
  total: propTypes.number,
  changePageCurrent: propTypes.func,
  changePageSize: propTypes.func,
  batchButton: propTypes.bool,
  rowSelection: propTypes.object,
  rowKey: propTypes.string,
};
// 默认
TableBasic.defaultProps = {
  columns: [],
  dataSource: [],
  total: 0,
  batchButton: true,
  rowKey: "id",
};

export default TableBasic;
