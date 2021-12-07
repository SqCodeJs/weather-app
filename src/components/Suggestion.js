import React from "react";

import { titleCase } from "../functions";
import styled from "styled-components";
import PropTypes from "prop-types";
import { device } from "../device";

const Suggestion = ({ localData, showCity, activeCart, displayToggle }) => {
  const list = localData.map((item, i) => (
    <SuggestionButton key={i} onClick={() => showCity(item)}>
      {titleCase(item)}
    </SuggestionButton>
  ));
  return (
    <ContainerStyled>
      <ClosedButtonStyled onClick={displayToggle}>x</ClosedButtonStyled>
      <TitleStyled>Recently searched places </TitleStyled>
      <Wrapp> {list} </Wrapp>
    </ContainerStyled>
  );
};
const Wrapp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleStyled = styled.h1`
  padding: 1%;
  font-size: 10px;
  font-family: Trebuchet MS, sans-serif;
  color: rgba(220, 240, 250, 1);
  letter-spacing: 2px;
  text-align: center;
  @media ${device.mobileM} {
    font-size: 12px;
  }
  @media ${device.tablet} {
    font-size: 14px;
  }
  @media ${device.laptop} {
    font-size: 16px;
  }
  @media ${device.laptopL} {
    font-size: 18px;
  }
`;
const ContainerStyled = styled.div`
  width: 300px;
  height: 80px;
  padding: 1%;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  right: 10%;
  top: 5%;

  font-family: Trebuchet MS, sans-serif;
  color: rgba(220, 240, 250, 1);
  background-color: rgba(140, 140, 140, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 3px 2px 17px 8px rgba(50, 0, 0, 0);
  border-radius: 10px;
  cursor: pointer;
  &:hover {
  }
  @media ${device.mobileM} {
    font-size: 14px;
  }
  @media ${device.tablet} {
    font-size: 16px;
  }
  @media ${device.laptop} {
    width: 300px;
    height: 80px;
    padding: 2%;
  }
  @media ${device.laptopL} {
  }
`;
const ClosedButtonStyled = styled.button`
  position: absolute;
  display: none;
  width: 20px;

  right: -10px;
  top: -10px;
  margin: 0 auto;

  text-align: center;

  line-height: 18px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);

  border: 1px solid rgba(255, 255, 255, 0.7);
  border: none;
  background-color: rgba(200, 200, 200, 0.5);
  border-radius: 20px;
  opacity: 0.5;
  transition: 0.3s;
  &:hover {
    opacity: 1;
    color: rgba(255, 255, 255, 1);
    right: -15px;
    top: -15px;
  }
  cursor: pointer;

  ${ContainerStyled}:hover & {
    display: block;
  }
`;

const SuggestionButton = styled.button`
  text-align: center;
  padding: 2% 4%;
  margin: 2%;
  font-family: Trebuchet MS, sans-serif;
  color: rgba(220, 240, 250, 1);
  border: none;
  letter-spacing: 2px;

  background-color: rgba(50, 50, 50, 0.7);
  border-radius: 20px;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
  cursor: pointer;
  @media ${device.mobileM} {
    font-size: 12px;
    line-height: 18px;
  }
  @media ${device.tablet} {
    font-size: 14px;
    line-height: 20px;
  }
  @media ${device.laptop} {
    font-size: 16px;
    line-height: 22px;
  }
  @media ${device.laptopL} {
    font-size: 18px;
    line-height: 24px;
  }
`;
Suggestion.propTypes = {
  localData: PropTypes.array,
  showCity: PropTypes.func,
  carts: PropTypes.number,
  displayToggle: PropTypes.func,
};
export default Suggestion;
