import React from "react";

import { titleCase } from "./functions";
import styled from "styled-components";
import PropTypes from "prop-types";

const Suggestion = ({ localData, showCity, carts, displayToggle }) => {
  const list = localData.map((item, i) => (
    <SuggestionButton
      disabled={carts === 4 ? true : false}
      key={i}
      onClick={() => showCity(item)}
    >
      {titleCase(item)}
    </SuggestionButton>
  ));
  return (
    <ContainerStyled>
      <ClosedButtonStyled onClick={displayToggle}>x</ClosedButtonStyled>
      <TitleStyled>Ostatnio wyszukiwane miejsca: </TitleStyled>
      <div>{list}</div>
    </ContainerStyled>
  );
};
const TitleStyled = styled.h1`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  font-family: Helvetica, sans-serif;
  text-align: center;
`;
const ContainerStyled = styled.div`
  min-width: 200px;
  height: 80px;
  padding: 5px;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  right: 200px;
  top: 60px;
  opacity: 0.9;
  background-color: black;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 5px;
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
  font-size: 10px;
  color: white;
  border: 1px solid white;
  background-color: black;
  border-radius: 50%;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
  cursor: pointer;

  ${ContainerStyled}:hover & {
    display: block;
  }
`;

const SuggestionButton = styled.button`
  margin: 10px;

  font-size: 16px;
  text-align: center;
  line-height: 18px;

  color: white;
  border: 1px solid white;
  background-color: black;
  border-radius: 10%;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
  cursor: pointer;
  /* width: 80px;
  height: 40px;

  border: 2px solid white;
  border-radius: 25px;
  background-color: transparent;
  opacity: ${(props) => (props.opacity === 4 ? "0.3" : "")};
  cursor: pointer;
  padding: 0;
  font-size: 20px;
  line-height: 34px; */
`;
Suggestion.propTypes = {
  localData: PropTypes.array,
  showCity: PropTypes.func,
  carts: PropTypes.number,
  displayToggle: PropTypes.func,
};
export default Suggestion;
