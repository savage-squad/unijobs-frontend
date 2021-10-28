import styled from 'styled-components';

export const Container = styled.aside`
  background: #f7f7f7;
  border: 1px solid #dddddd;
  padding: 30px 0 0 0;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  min-height: calc(100vh - 250px);

  a {
    text-decoration: none;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    padding: 10px 30px;
    align-items: center;

    color: #555555;

    &:hover {
      color: #51ab0e;
    }
    @media (max-width: 801px) {
      padding: 10px 20px;
    }
  }

  @media (max-width: 801px) {
    min-height: 40px;
    height: 100%;
    flex-direction: row;
    justify-content: center;
    padding: 15px 0;
  }
`;
