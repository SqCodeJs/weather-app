import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Form = ({ showCity, handleChange, city, carts }) => {
  return (
    <FormStyled>
      <InputStyled
        type="text"
        value={city}
        onChange={handleChange}
        placeholder="Miasto"
      />
      <ButtonStyled
        onClick={() => showCity(city)}
        opacity={carts}
        disabled={carts === 4 ? true : false}
      >
        +
      </ButtonStyled>
    </FormStyled>
  );
};
const FormStyled = styled.div`
  width: 80%;
  height: 50px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputStyled = styled.input`
  width: 80%;
  height: 20px;
  margin: 0 10px;
  padding: 10px;
  background-color: transparent;

  color: #4e4c4cd2;

  border: 2px solid white;
  border-radius: 25px;
  &:focus {
    outline: none;
  }
`;

const ButtonStyled = styled.button`
  width: 5%;
  height: 40px;

  border: 2px solid white;
  border-radius: 25px;
  background-color: transparent;
  opacity: ${(props) => (props.opacity === 4 ? "0.3" : "")};
  cursor: ${(props) => (props.opacity === 4 ? "" : "pointer")};
  padding: 0;
  font-size: 20px;
  line-height: 34px;
`;
Form.propTypes = {
  showCity: PropTypes.func,
  handleChange: PropTypes.func,
  city: PropTypes.string,
  carts: PropTypes.number,
};
export default Form;
