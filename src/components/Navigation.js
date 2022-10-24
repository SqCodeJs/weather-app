import React from "react";
import styled from "styled-components";
import { device } from "../device";
const Wrapper = styled.section`
  display: flex;
`;
const List = styled.ul`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10vh;
`;
const Bullet = styled.li`
  width: 8px;
  height: 8px;
  margin: 3px;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${(props) =>
    props.activeCart ? "rgb(255,255,255)" : "rgb(120,120,120)"};
`;
const Button = styled.div`
  width: 20%;
  border: 1px solid red;
`;

const Navigation = ({ weatherLength, activeCart, setActiveCart }) => {
  const returnBullets = () => {
    const bulletList = [];
    for (let i = 0; i < weatherLength; i++) {
      bulletList.push(
        <Bullet
          activeCart={activeCart === i}
          key={i}
          onClick={() => {
            if (activeCart !== i) {
              setActiveCart(i);
            }
          }}
        ></Bullet>
      );
    }
    return bulletList;
  };
  return (
    <Wrapper>
      <Button></Button>
      <List>{returnBullets()}</List>
      <Button></Button>
    </Wrapper>
  );
};
export default Navigation;
