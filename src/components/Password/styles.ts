import styled from 'styled-components';
import { shade } from 'polished';


export const FormGrid = styled.div`
  grid-area: formgrid;
  height: fit-content;
  padding: 20px;
  width: 100%;
  display: grid;
  grid-template-columns:  1fr;
  gap: 15px;


  @media (min-width: 1450px) {
    width: 1150px;
  }
`;

export const Formbox = styled.div`
  width: 100%;
  background: #ffffff;
  border: 0.8px solid #dddddd;
  box-shadow: 2px 2px 10px rgba(34, 34, 34, 0.05);
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  legend {
    background: #f5f6f8;
    border-bottom: 0.8px solid #dddddd;
    padding: 25px 30px;

    font-style: normal;
    font-weight: bold;
    font-size: 1.2em;
    color: #555555;
  }
`;

export const InputBox = styled.div`
  padding: 10px 30px 35px 30px;
  font-size: 20px;

  > :last-child {
    margin-top: 10px;
  }
  > :first-child {
    margin-bottom: 10px;
  }
`;

export const Buttons = styled.button`
  width: 100%;
  background: none;
  border: 0;
  text-align: left;

  @media (max-width: 650px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (max-width: 509px) {
    button {
      width: 100%;
      margin-right: 0;
    }
  }
`;
