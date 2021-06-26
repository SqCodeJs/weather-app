import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Form = ({ children, showCity, autocompleteCities, handleChange, city, activeCart }) => {
  return (
    <FormStyled>
      <InputChildStyled>
        <InputStyled
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="City"
          borderBottom={city}
        />
      </InputChildStyled>
      <ButtonChildStyled>
        {/* {city.length > 2 && autocompleteCities.length === 0 ? */}
        {city.length > 2?
         (
          <ButtonStyled
            onClick={() => showCity(city)}
            opacity={activeCart}
            disabled={activeCart === 10 ? true : false}
          >
            +
          </ButtonStyled>
        ) : null}
      </ButtonChildStyled>
      {children}
    </FormStyled>
  );
};
const FormStyled = styled.div`
  box-sizing: border-box;

  margin: 0 5%; 
  position: relative;

  display: flex;
  padding: 0;
  width: 90%;
  /* height: 50px; */
  display: flex;
  justify-content: left;
`;
const InputChildStyled = styled.div`
  width: 45%;
`;

const InputStyled = styled.input`
  box-sizing: border-box;
  padding: 10px 20px;
  
  margin: 0;
  flex-grow: 0;
  width: 100%;
  border-radius: ${(props) =>
    props.borderBottom.length > 3 ? " 10px 10px 0 0" : "10px"};

  border: none;
  box-shadow: 0 1px 6px rgb(32 33 36 / 28%);

  font-size: 18px;
  color: #222;
  line-height: 24px;
  font-family: arial, sans-serif;
  background-color: rgba(255, 255, 255, 1);

  &:focus {
    outline: none;
  }
`;
const ButtonChildStyled = styled.div`
  box-sizing: border-box;
   margin: 0 20px;
  
  padding: 0;
  width: 5%;
  flex-grow: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonStyled = styled.button`
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  width: 50%;

  flex-grow: 0;
  border: 2px solid white;
  border-radius: 25px;
  background-color: transparent;

  opacity: ${(props) => (props.opacity === 4 ? "0.3" : "1")};
  cursor: ${(props) => (props.opacity === 4 ? "" : "pointer")};
  font-size: 22px;
  line-height: 32px;
  color: #222;

  font-family: arial, sans-serif;
`;
Form.propTypes = {
  showCity: PropTypes.func,
  handleChange: PropTypes.func,
  city: PropTypes.string,
  carts: PropTypes.number,
};
export default Form;
