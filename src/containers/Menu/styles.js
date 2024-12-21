import styled from "styled-components";
import BannerHamburger from '../../assets/banner-hamburger.svg';
import Background from '../../assets/background-Home.svg'
import { Link } from "react-router-dom";

export const Container = styled.div`
width: 100%;
min-height: 100vh;
background-color: ${(props) => props.theme.secondWhite};

background-image: linear-gradient(
  rgba(255,255,255, 0.1),
  rgba(255,255,255, 0.1)
),
url('${Background}');
overflow: hidden;
`
export const BackButton = styled.button`
  display: block;
  margin: 20px auto 0; // Centraliza o botão e adiciona espaçamento superior
  background-color: ${(props) => props.theme.purple};
  color: #f1f1f1;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${(props) => props.theme.secondDarkPurple};
  }
`

export const Banner = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 480px;
width: 100%;
position: relative;

background: url('${BannerHamburger}') no-repeat;
background-color: ${(props) => props.theme.mainBlack};
background-position: center;
background-size: cover;

h1 {
  font-family: 'Road Rage', sans-serif;
  font-size: 80px;
  line-height: 60px;
  color: ${(props) => props.theme.white};
  position: absolute;

  right: 20%;
  top: 30%;

  span {
    display: block;
    color: ${(props) => props.theme.white};
    font-size: 20px;
  }
}
`
export const CategoryMenu = styled.div`
display: flex;
justify-content: center;
gap: 50px;
margin-top: 30px;
`;
export const CategoryButton = styled(Link)`
text-decoration: none;
cursor: pointer;
background: none;
color: ${(props) => (props.$isActiveCategory ?  (props) => props.theme.purple : '#696969')};
font-size: 24px;
font-weight: 500;
padding-bottom: 5px;
line-height: 20px;
border: none;
border-bottom: ${(props) => props.$isActiveCategory && `3px solid # ${(props) => props.theme.purple}`} ;
`;

export const ProductsContainer = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
padding: 40px;
gap: 60px;
justify-content: center;
max-width: 1280px;
margin: 50px auto 0;
`