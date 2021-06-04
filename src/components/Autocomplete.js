import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Autocomplete = ({ data, city, showCity }) => {
  return <ListUlStyled>{city ? data.map((e, i) => (
      <LiStyled key={i} onClick={() => showCity(e)}>
        {e.toLowerCase()}
      </LiStyled>
  )) : ""}</ListUlStyled>;
};

const ListUlStyled = styled.ul`
  list-style: none;
`;

const LiStyled = styled.li`
  width: 300px;
  height: 20px;
  border: 1px solid transparent;

  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

Autocomplete.propTypes = {
  data: PropTypes.array,
  city: PropTypes.string,
  showCity: PropTypes.func,
};
export default Autocomplete;
