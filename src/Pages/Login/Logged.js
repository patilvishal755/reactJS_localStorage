import React, { Component } from "react";
import styled from "styled-components";
import { Table,Button } from "antd";
import Layout from "../../Layout/layout.js";

const StyledDiv = styled.div`
  max-width: 50%;
  text-align: center;
  margin-left: 400px !important;
`;

class Logged extends Component {
  render() {
    const userData = localStorage.getItem("userData");
    let db = [];
    db = JSON.parse(userData);
    const columns = [
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Phone Number",
        dataIndex: "phone",
        key: "phone"
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city"
      }
    ];

    console.log(db);
    return (
      <div>
        <Layout />
        <StyledDiv>
        <Button style={{marginLeft: "763px"}}>Log out</Button>
          <h2>Users Data</h2>
          <div>
          
          </div>

        </StyledDiv>

        <StyledDiv>
          <Table dataSource={db} columns={columns} />
        </StyledDiv>
      </div>
    );
  }
}

export default Logged;
