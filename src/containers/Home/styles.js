import styled from "styled-components";
import BannerHome from '../../assets/banner-home.svg';
import Background from '../../assets/background-Home.svg'

export const Banner = styled.div`
background-image: url('${BannerHome}');
background-size: cover;
background-position: center;
height: 480px;

h1 {
  font-family: "Road Rage", sans-serif;
  font-size: 80px;
  color: ${(props) => props.theme.thirdWhite};
  position: absolute;
  right: 20%;
  top: 10%;
}

`;

export const Container = styled.section`
background-image: linear-gradient(
  rgba(255,255,255, 0.1),
  rgba(255,255,255, 0.1)
),
url('${Background}');
height: 800px;
display: flex;
flex-direction: column;
`;