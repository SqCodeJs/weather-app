import React from "react";
import styled from "styled-components";

const ErrorComponent = () => (
  <ErrorStyled>Cos poszlo nie tak sprobuj jeszcze raz.</ErrorStyled>
);
const ErrorStyled = styled.div`
  width: 80%;
  margin: 0 auto;
  color: white;
  font-size: 22px;
  font-family: Arial, Helvetica, sans-serif;
`;

export default ErrorComponent;
