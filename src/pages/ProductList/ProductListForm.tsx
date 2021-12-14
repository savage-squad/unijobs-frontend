/* eslint-disable react/no-unescaped-entities */
import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
import { Content } from '../Product/styles';

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
        <Title>Produtos encontrados com "{search}"</Title>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'start',
          marginTop: '5%',
          marginBottom: '5%',
          flexWrap: 'wrap',
        }}
      >
        {products?.content.map(product => (
          <ProductItem key={product.id_produto}>
            <ProductImage
              src={
                product.miniatura?.includes('http') ? product.miniatura : 'asd'
              }
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
      </div>
      <Footer />
    </Fragment>
  );
};

export default ProductFormList;
