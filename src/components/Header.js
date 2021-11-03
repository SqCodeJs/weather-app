import React from "react";
import styled from "styled-components";
const HeaderStyled = styled.div`
  box-sizing: border-box;

  width: 100%;
  margin: 0 auto;
  padding: 5px;
  font-family: Trebuchet MS, sans-serif;
`;
const TitleStyled = styled.h1`
  width: 100%;
  font-size: 46px;

  color: rgba(220, 240, 250, 1);
  text-align: center;
`;

const Header = () => (
  <HeaderStyled>
    <TitleStyled>Find a forecast</TitleStyled>
  </HeaderStyled>
);

export default Header;
