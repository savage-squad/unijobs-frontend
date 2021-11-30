import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ProductItem = styled.section`
  display: flex;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  position: relative;
  transition: all 0.1s ease-in;
  margin: 0 0.5rem;
  height: 200px;
  width: 500px;
  margin-bottom: 15px;
  
  &:hover {
    box-shadow: 0 7px 16px 0 rgba(0, 0, 0, 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  }

  &::after {
    content: '';
    height: 100%;
    width: 5px;
    background: #65ad2f;
    position: absolute;
    right: 0;
    border-radius: 0px 4px 4px 0px;
  }
  &:hover::after {
    background: orange;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    &::after {
      border-radius: 4px 4px 0px 0px;
      height: 5px;
      width: 100%;
    }
  }
`;

export const ProductImage = styled.img`
  width: 13rem;
  object-fit: cover;
  border-radius: 4px 0px 0px 4px;
  @media (max-width: 768px) {
    width: 100%;
    height: 15rem;
    border-radius: 4px 4px 0px 0px;
  }
`;

export const ProductContent = styled.section`
  padding: 1rem 1.5rem;
`;

export const ProductHeader = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ProductCategory = styled.span`
  color: #65ad2f;
  font-size: 0.9rem;
  font-weight: 300;
  margin-bottom: 0.4rem;
`;

export const ProductTitle = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  line-height: 1.3rem;
  color: #333;
`;
export const ProductDescription = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.5rem;
  margin-bottom: 1.3rem;
  height: 60px;
  font-size: 0.9rem;
  line-height: 1.2rem;
`;
export const ProductFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProductLink = styled(Link)`
  font-weight: 500;
  font-size: 0.9rem;
  color: #0e346a;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
export const ProductPrice = styled.h3`
  font-family: Roboto;
  font-size: 1.5rem;
  color: #0c3a7b;
  margin-left: 50px;
`;
