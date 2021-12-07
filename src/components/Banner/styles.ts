import styled from 'styled-components';

import searchIcon from '../../assets/search.svg';

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 0 35px;
  justify-content: space-evenly;
  height: fit-content;
  background: #0e346a;
  flex-wrap: wrap;

  a {
    text-decoration: none;
    color: white;
    font-size: 1rem;
    margin: 0 15px;
    color: #ffffff;
    padding: 15px 25px;
    border-radius: 50px;
  }

  .menu :first-child {
    background: #65ad2f;
    box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.1);
  }
  img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
  }
  button {
    margin-right: 10%;
    text-align: left;
    background: none;
    outline: none;
    border: 0;
    svg {
      color: #ffffff;
      stroke-width: 1px;
    }
  }

  .searchbar {
    display: flex;
    width: 100%;
  }

  .searchbar input {
    display: flex;

    margin: 0;
    height: 40px;
    width: 100%;

    padding-left: 10px;

    outline: none;
    border: 1px solid #dddddd;
    border-radius: 5px 0 0 5px;

    font-weight: 500;
    font-size: 12px;
    color: #d9d9d9;

    &:focus {
      color: #0e346a;
    }
  }

  .searchbar span {
    height: 40px;
    width: 60px;
    margin: 0 20px 0 0;
    border: 1px solid #dddddd;
    border-radius: 0 5px 5px 0;
    border-left: 0;
    background: #ffffff url(${searchIcon}) no-repeat center;
    cursor: pointer;
  }

  @media (max-width: 740px) {
    display: flex;
    justify-content: space-around;
    padding: 15px 15px 30px 15px;

    img {
      margin-bottom: 20px;
    }

    button {
      margin-right: 0;
    }
  }
`;
