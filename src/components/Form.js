import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
const FormStyled = styled.div`
  box-sizing: border-box;

  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;
const InputChildStyled = styled.div`
  position: relative;
  margin: 2% auto;
  width: 80%;
`;

const InputStyled = styled.input`
  box-sizing: border-box;
  padding: 1%;
  padding-left: 20px;
  margin: 0;
  flex-grow: 0;
  width: 100%;
  border-radius: ${(props) =>
    props.borderBottom.length > 2 ? " 10px 10px 0 0" : "10px"};

  border: none;
  box-shadow: 0 1px 6px rgb(32 33 36 / 28%);

  font-size: 20px;
  color: #222;
  line-height: 26px;
  font-family: arial, sans-serif;
  background-color: rgba(255, 255, 255, 1);

  &:focus {
    outline: none;
  }
`;
const ButtonChildStyled = styled.div`
  box-sizing: border-box;
  /* margin: 0 20px; */
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
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

  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  border: none;

  border-radius: 50%;
  background-color: #3c638a;

  opacity: ${(props) => (props.opacity === 4 ? "0.3" : "1")};
  cursor: ${(props) => (props.opacity === 4 ? "" : "pointer")};
  font-size: 22px;

  color: white;

  font-family: arial, sans-serif;
  &:hover {
    box-shadow: 0px 0px 4px 4px rgba(100, 100, 100, 1);
  }
`;

const Form = ({ children, showCity, handleChange, city, activeCart }) => {
  return (
    <FormStyled>
      <InputChildStyled>
        {children}
        <InputStyled
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="city"
          borderBottom={city}
        />
        <ButtonChildStyled>
          {city.length > 2 ? (
            <ButtonStyled
              onClick={() => showCity(city)}
              opacity={activeCart}
              disabled={activeCart === 10 ? true : false}
            >
              +
            </ButtonStyled>
          ) : null}
        </ButtonChildStyled>
      </InputChildStyled>
    </FormStyled>
  );
};

Form.propTypes = {
  showCity: PropTypes.func,
  handleChange: PropTypes.func,
  city: PropTypes.string,
  carts: PropTypes.number,
};
export default Form;
