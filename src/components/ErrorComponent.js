import React from "react";
import styled from "styled-components";

const ErrorComponent = () => (
  <Wrapp>
    <ErrorStyled>Something went wrong, try agin.</ErrorStyled>
  </Wrapp>
);
const Wrapp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const ErrorStyled = styled.div`
  width: 500px;
  margin: 20px;
  padding: 10px;
  display: flex;
  justify-content: center;
  font-size: 20px;

  font-family: Trebuchet MS, sans-serif;
  letter-spacing: 1px;
  color: rgba(220, 240, 250, 1);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 17px 8px rgba(50, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.111);
  }
`;

export default ErrorComponent;
