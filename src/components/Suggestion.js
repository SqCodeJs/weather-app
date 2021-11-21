import React from "react";

import { titleCase } from "../functions";
import styled from "styled-components";
import PropTypes from "prop-types";

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
      <div>{list}</div>
    </ContainerStyled>
  );
};
const TitleStyled = styled.h1`
  font-size: 18px;
  font-family: Trebuchet MS, sans-serif;
  color: rgba(220, 240, 250, 1);
  letter-spacing: 2px;
  text-align: center;
`;
const ContainerStyled = styled.div`
  min-width: 300px;
  height: 80px;
  padding: 5px;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  right: 180px;
  top: 60px;
  border-radius: 5px;
  font-family: Trebuchet MS, sans-serif;
  color: rgba(220, 240, 250, 1);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 17px 8px rgba(50, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.111);
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
  margin: 10px;
  padding: 5px 10px;
  font-size: 16px;
  text-align: center;
  line-height: 18px;

  font-family: Trebuchet MS, sans-serif;
  color: rgba(220, 240, 250, 1);
  border: none;
  letter-spacing: 2px;
  /* border: 1px solid rgba(255, 255, 255, 0.7); */
  background-color: rgba(200, 200, 200, 0.3);
  border-radius: 20px;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
  cursor: pointer;
`;
Suggestion.propTypes = {
  localData: PropTypes.array,
  showCity: PropTypes.func,
  carts: PropTypes.number,
  displayToggle: PropTypes.func,
};
export default Suggestion;
