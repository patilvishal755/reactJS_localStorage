import React from "react";
import { withRouter } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import Layout from "../../Layout/layout.js";
import styled from "styled-components";
const FormItem = Form.Item;

const StyledForm = styled(Form)`
  max-width: 300px;
  text-align: center;
  margin-left: 520px !important;
`;
const StyledAnchor = styled.a`
  float: right;
`;
const StyledButton = styled(Button)`
  width: 100%;
`;

class Login extends React.Component {
  handleSubmit = e => {
    let flag = 0;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let userData = localStorage.getItem("userData");
        if (userData) {
          let parsed = JSON.parse(userData);
          if (Array.isArray(parsed)) {
            let found = parsed.filter(v => v.email === values.email);
            if (found.length > 0) {
              this.props.history.push(`/loggedIn`);
            } else {
              message.error("Email Id or password is not Correct!");
            }
          }
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Layout />
        <StyledForm onSubmit={this.handleSubmit}>
          <FormItem>
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
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email ID"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: false
            })(<Checkbox>Remember me</Checkbox>)}
            <StyledAnchor href="">Forgot password</StyledAnchor>
            <StyledButton type="primary" htmlType="submit">
              Log in
            </StyledButton>
            Or <a href="/register">register now!</a>
          </FormItem>
        </StyledForm>
      </div>
    );
  }
}

export const LoginForm = withRouter(Form.create()(Login));
