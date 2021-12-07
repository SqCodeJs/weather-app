import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.show.length > 2 ? "Block" : "none")};
  position: absolute;
  left: 0;
  top: 42px;

  width: 100%;
  padding: 0 20px 20px 20px;
  margin: 0;

  font-size: 18px;
  color: #222;
  line-height: 24px;
  font-family: arial, sans-serif;

  border: none;
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
  border-radius: 0 0 10px 10px;
  background-color: rgba(255, 255, 255, 1);
`;
const ListUlStyled = styled.ul`
  box-sizing: border-box;

  width: 100%;
  margin: 0;
  padding: 15px 0;
  border-top: 1px solid rgba(128, 128, 128, 0.8);

  list-style: none;
`;

const LiStyled = styled.li`
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;

const Autocomplete = ({ data, city, showCity }) => {
  return (
    <Wrapper show={city}>
      <ListUlStyled>
        {city
          ? data
              .filter((e, i) => i < 15)
              .map((e, i) => (
                <LiStyled key={i} onClick={() => showCity(e)}>
                  {e}
                </LiStyled>
              ))
          : ""}
      </ListUlStyled>
    </Wrapper>
  );
};

Autocomplete.propTypes = {
  data: PropTypes.array,
  city: PropTypes.string,
  showCity: PropTypes.func,
};
export default Autocomplete;
