import React from "react";
import styled from "styled-components";
import { device } from "../device";
const HeaderStyled = styled.div`
  width: 100%;

  font-family: Trebuchet MS, sans-serif;
`;
const TitleStyled = styled.h1`
  width: 100%;
  font-size: 28px;

  color: rgba(220, 240, 250, 1);
  text-align: center;
  @media ${device.mobileM} {
    font-size: 32px;
  }
  @media ${device.tablet} {
    font-size: 38px;
  }
  @media ${device.laptop} {
    font-size: 42px;
  }
  @media ${device.laptopL} {
    font-size: 45px;
  }
`;

const Header = () => (
  <HeaderStyled>
    <TitleStyled>Find a forecast</TitleStyled>
  </HeaderStyled>
);

export default Header;
