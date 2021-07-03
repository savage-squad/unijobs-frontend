import React, { useState, useEffect } from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { IItem } from '../../services/types';

import {
  ProductItem,
  ProductImage,
  ProductContent,
  ProductHeader,
  ProductCategory,
  ProductTitle,
  ProductDescription,
  ProductFooter,
  ProductLink,
  ProductPrice,
} from './styles';
import api from '../../services/api';

const Slider: React.FC = () => {
  const [products, setProducts] = useState<IItem[]>([]);

  const imageNotFound: string = "https://i.imgur.com/sM05PIm.png";

  useEffect(() => {
    api.get('/itens').then(response => {
      console.log(response.data);
      setProducts(response.data);
    });
  }, []);

  return (
    <Carousel
      infinite
      slidesPerPage={2}
      arrowLeft={<FiChevronLeft size={60} color="#0E346A" />}
      arrowRight={<FiChevronRight size={60} color="#0E346A" />}
      addArrowClickHandler
      breakpoints={{
        900: {
          slidesPerPage: 1,
          arrows: false,
        },
      }}
    >
      {products.map(product => (
        <ProductItem key={product.id}>
          <ProductImage
            src={product.miniatura?.includes("http")? product.miniatura : imageNotFound}
            alt={product.title}
          />
          <ProductContent>
            <ProductHeader>
              <ProductCategory>{product.type}</ProductCategory>
              <ProductTitle>{product.titulo}</ProductTitle>
            </ProductHeader>
            <ProductDescription>{product.descricao}</ProductDescription>
            <ProductFooter>
              <ProductLink to={`/item/${product.id}`}>
                + informações
              </ProductLink>
              <ProductPrice>R$ {product.preco}</ProductPrice>
            </ProductFooter>
          </ProductContent>
        </ProductItem>
      ))}
    </Carousel>
  );
};

export default Slider;
