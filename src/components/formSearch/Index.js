import React, { Component } from "react";

// propTypes
import propTypes from "prop-types";
// antd
import { Form, Input, Button, Select, InputNumber, Radio } from "antd";

// connect
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// action
import {
  addDepartmentList,
  updateDepartmentList,
} from "@/store/action/Department";
// url
import requestUrl from "@api/requestUrl";
// api
import { TableList } from "@api/common";

const { Option } = Select;
class FormSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      mesPreix: {
        Input: "请输入",
        Radio: "请选择",
        Select: "请选择",
      },
    };
  }

  componentDidMount() {
    this.onSubmit();
  }

  rules = (item) => {
    const { mesPreix } = this.state;
    let rules = [];
    if (item.required) {
      let message = item.message || `${mesPreix[item.type]}${item.label}`;
      rules.push({ required: true, message: message });
    }
    if (item.rules && item.rules.length > 0) {
      rules = rules.concat(item.rules);
    }
    return rules;
  };
  // input
  inputItem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <Input style={item.style} placeholder={item.placeholder} />
      </Form.Item>
    );
  };
  // input
  textareaItem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <Input.TextArea style={item.style} placeholder={item.placeholder} />
      </Form.Item>
    );
  };
  // inputNumber
  inputNumberItem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <InputNumber min={item.min} max={item.max} />
      </Form.Item>
    );
  };
  // radio
  radioItem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <Radio.Group>
          {item.options &&
            item.options.map((item) => {
              return (
                <Radio value={item.value} key={item.value}>
                  {item.label}
                </Radio>
              );
            })}
        </Radio.Group>
      </Form.Item>
    );
  };
  // select
  selectItem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <Select style={item.style} placeholder={item.placeholder}>
          {item.options &&
            item.options.map((elem) => {
              return (
                <Option value={elem.value} key={elem.value}>
                  {elem.label}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
    );
  };
  initFromItem = () => {
    const { formItem } = this.props;
    // 检测是否存在fromItem
    if (!formItem || (formItem && formItem.length === 0)) {
      return false;
    }
    const fromList = [];
    formItem.forEach((item) => {
      if (item.type === "Input") {
        fromList.push(this.inputItem(item));
      }
      if (item.type === "Select") {
        item.options = this.props.config[item.optionsKey];
        fromList.push(this.selectItem(item));
      }
      if (item.type === "InputNumber") {
        fromList.push(this.inputNumberItem(item));
      }
      if (item.type === "Radio") {
        fromList.push(this.radioItem(item));
      }
      if (item.type === "TextArea") {
        fromList.push(this.textareaItem(item));
      }
    });
    return fromList;
  };
  search = (params) => {
    const requestData = {
      url: requestUrl[params.url],
      method: "post",
      data: {
        pageNumber: 1,
        pageSize: 10,
      },
    };
    // 拼接搜索参数
    if (Object.keys(params.searchData).length !== 0) {
      for (let key in params.searchData) {
        requestData.data[key] = params.searchData[key];
      }
    }
    TableList(requestData)
      .then((response) => {
        const resData = response.data.data;
        this.props.actions.addData(resData);
      })
      .catch((error) => {});
  };
  onSubmit = (value) => {
    const searchData = {};
    for (let key in value) {
      if (value[key] !== undefined && value[key] !== "") {
        searchData[key] = value[key];
      }
    }
    this.search({
      url: "departmentList",
      searchData,
    });
  };
  render() {
    return (
      <Form
        layout="inline"
        ref="form"
        onFinish={this.onSubmit}
        initialValues={this.props.formConfig.initValue}
        {...this.props.formLayout}
      >
        {this.initFromItem()}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={this.state.loading}>
            搜索
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

FormSearch.propTypes = {
  formConfig: propTypes.object,
};

FormSearch.defaultProps = {
  formConfig: {},
};

const mapStateToProps = (state) => ({
  config: state.config,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // listData: bindActionCreators(addDepartmentList, dispatch),  //单个action做处理
    actions: bindActionCreators(
      {
        addData: addDepartmentList,
        updataData: updateDepartmentList,
      },
      dispatch
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormSearch);
