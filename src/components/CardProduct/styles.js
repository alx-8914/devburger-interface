import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 20px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.white};
  cursor: grab;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  position: relative;

  div {
    width: 45%;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;
    z-index: 3;

    p {
      font-size: 14px;
      color: ${(props) => props.theme.orange};
      line-height: 20px;
      font-weight: 700;
      margin-top: 58px;
      text-align: right;
    }

    strong {
      font-size: 20px;
      color: ${(props) => props.theme.black};
      font-weight: 800;
      line-height: 40px;
      margin-block-end: -45px;
    }
  }
`;

export const CardImage = styled.div`
  background-image: url(${(props) => props.$imageurl});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100px;
  position: absolute;
  top: -50px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

