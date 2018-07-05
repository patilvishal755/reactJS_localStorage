import React from "react";
import { withRouter } from "react-router-dom";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  message
} from "antd";
import Layout from "../../Layout/layout.js";
import styled from "styled-components";

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const city = [
  {
    value: "Pune",
    label: "Pune",
    children: [
      {
        value: "Narhe",
        label: "Narhe"
      },
      {
        value: "wakad",
        label: "wakad"
      }
    ]
  },
  ,
  {
    value: "Mumbai",
    label: "Mumbai"
  }
];

const StyledForm = styled(Form)`
  max-width: 400px;
  text-align: center;
  margin-left: 420px !important;
`;

class Register extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    let flag = 0;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let userData = localStorage.getItem("userData");
        if (userData) {
          let parsed = JSON.parse(userData);
          if (Array.isArray(parsed)) {
            let found = parsed.filter(v => v.email === values.email);
            if (found.length > 0) {
              message.error("Email Id already exists");
            } else {
              localStorage.removeItem("userData");
              const obj = [values];
              let new_values = parsed.concat(obj);
              localStorage.setItem("userData", JSON.stringify(new_values));
              message.success("successfully register");
              this.props.history.push(`/`);
            }
          }
        } else {
          const obj = [values];
          let temp = [];
          let new_Array = temp.concat(obj);
          localStorage.setItem("userData", JSON.stringify(new_Array));
          message.success("successfully register");
          this.props.history.push(`/`);
          //console.log(new_Array);
        }
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "91"
    })(
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
        <Option value="01">+01</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <div>
        <Layout />
        <StyledForm onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="E-mail">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Password">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input type="password" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Confirm Password">
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="City">
            {getFieldDecorator("city", {
              initialValue: ["Pune", "Mumbai", "Dhule"],
              rules: [
                {
                  type: "array",
                  required: true,
                  message: "Please select your City!"
                }
              ]
            })(<Cascader options={city} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Phone Number">
            {getFieldDecorator("phone", {
              rules: [
                { required: true, message: "Please input your phone number!" }
              ]
            })(
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            {getFieldDecorator("agreement", {
              valuePropName: "checked"
            })(
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </FormItem>
        </StyledForm>
      </div>
    );
  }
}

export const WrappedRegistrationForm = Form.create()(Register);
