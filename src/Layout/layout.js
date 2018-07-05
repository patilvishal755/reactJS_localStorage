import React from "react";
import logo from "./logo.svg";
import styled, { keyframes } from "styled-components";

const StyledApp = styled.div`
  text-align: center;
`;

const StyledHeader = styled.header`
  background-color: black;
  height: 150px;
  padding: 20px;
  color: white;
`;
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
const StyledImg = styled.img`
  animation: ${spin} infinite 20s linear;
  height: 80px;
`;
const StyledH1 = styled.h1`
  font-size: 1.5em;
  color: white;
`;
class Layout extends React.Component {
  render() {
    return (
      <StyledApp>
        <StyledHeader>
          <StyledImg src={logo} alt="logo" />
          <StyledH1>Welcome to React</StyledH1>
        </StyledHeader>
        <br />
      </StyledApp>
    );
  }
}

export default Layout;
