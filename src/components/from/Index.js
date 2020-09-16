import React, { Component } from "react";
// antd
import { Form, Input, Button, Select, InputNumber, Radio, message } from "antd";
// api
import { requestData } from "@api/common";
import requestUrl from "@api/requestUrl";
const { Option } = Select;
class FromCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mesPreix: {
        Input: "请输入",
        Radio: "请选择",
        Select: "请选择",
      },
      loading: false,
    };
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
            item.options.map((elem) => {
              return (
                <Radio value={elem.value} key={item.value}>
                  {elem.label}
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
                <Option value={elem.value} key={item.value}>
                  {elem.label}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
    );
  };
  initFromItem = () => {
    const { fromItem } = this.props;
    // 检测是否存在fromItem
    if (!fromItem || (fromItem && fromItem.length === 0)) {
      return false;
    }
    const fromList = [];
    fromItem.map((item) => {
      if (item.type === "Input") {
        fromList.push(this.inputItem(item));
      }
      if (item.type === "Select") {
        fromList.push(this.selectItem(item));
      }
      if (item.type === "InputNumber") {
        fromList.push(this.inputNumberItem(item));
      }
      if (item.type === "Radio") {
        fromList.push(this.radioItem(item));
      }
    });
    return fromList;
  };
  onSubmit = (value) => {
    // this.props.onSubmit(value);
    const data = {
      url: requestUrl[this.props.fromConfig.url],
      data: {},
    };
    requestData(data)
      .then((response) => {
        const responseData = response.data;
        // 提示
        message.info(responseData.message);
        // 取消按钮加载
        this.setState({
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  };
  render() {
    return (
      <Form
        {...this.state.fromLayout}
        initialValues={{ status: true, number: 0 }}
        onFinish={this.onSubmit}
        ref="from"
        {...this.props.fromLayout}
      >
        {this.initFromItem()}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={this.state.loading}>
            确定
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default FromCom;
