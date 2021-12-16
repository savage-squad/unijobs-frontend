import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import {
  ProductCategory,
  ProductContent,
  ProductDescription,
  ProductFooter,
  ProductHeader,
  ProductImage,
  ProductItem,
  ProductLink,
  ProductPrice,
  ProductTitle,
} from '../../components/SliderProducts/styles';
import api from '../../services/api';
import ScrollToTopOnMount from '../../utils/ScrollToTopOnMount';
import { Title } from '../LandingPage/styles';
import styled from 'styled-components';

interface Params {
  search?: string;
}

interface IProduct {
  id_produto: number;
  titulo: string;
  descricao: string;
  miniatura: string;
  type: string;
  tipoItem: string;
  preco: string;
}

interface IPage<T> {
  content: T[];
  number: number;
  size: number;
  totalPage: number;
}

const SearchContent = styled.div`
  display: flex;
  justify-content: start;
  margin-top: 5%;
  margin-bottom: 5%;
  flex-wrap: wrap;
`;

const ProductFormList = () => {
  const { search } = useParams<Params>();
  const [products, setProducts] = useState<IPage<IProduct>>();

  useEffect(() => {
    api.get<IPage<IProduct>>(`/produtos/${search}/search`).then(products => {
      setProducts(products.data);
    });
  }, [search]);

  return (
    <Fragment>
      <ScrollToTopOnMount />
      <Loading loading={false} />
      <Banner backIcon />
      <div style={{ margin: '10px 20px' }}>
        <Title>Produtos encontrados com &quot;{search}&quot;</Title>
      </div>
      <SearchContent>
        {products?.content.map(product => (
          <ProductItem key={product.id_produto}>
            <ProductImage
              src={product.miniatura?.includes('http') ? product.miniatura : ''}
              alt={product.titulo}
            />
            <ProductContent>
              <ProductHeader>
                <ProductCategory>{product.type}</ProductCategory>
                <ProductTitle>{product.titulo}</ProductTitle>
              </ProductHeader>
              <ProductDescription>{product.descricao}</ProductDescription>
              <ProductFooter>
                <ProductLink to={`/item/produtos/${product.id_produto}`}>
                  + informações
                </ProductLink>
                <ProductPrice>R$ {product.preco}</ProductPrice>
              </ProductFooter>
            </ProductContent>
          </ProductItem>
        ))}
      </SearchContent>
      <Footer />
    </Fragment>
  );
};

export default ProductFormList;
