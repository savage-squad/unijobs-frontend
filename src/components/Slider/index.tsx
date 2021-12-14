import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { Container, Content } from './styles';
import { IItem } from '../../services/types';
import api from '../../services/api';
import FakeItem from '../../services/product';
import { isEmpty } from '../../utils/FnHelper';

const Slider: React.FC = () => {
  const [products, setProducts] = useState<IItem[]>([]);

  useEffect(() => {
    api
      .get('/items/1')
      .then(response => {
        setProducts(response.data.data);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  const hasProducts = (): boolean => !isEmpty(products);

  return (
    (!hasProducts() && <Fragment>Nenhum produto definido</Fragment>) || (
      <Carousel
        slidesPerPage={4}
        arrowLeft={<FiChevronLeft size={60} color="#0E346A" />}
        arrowRight={<FiChevronRight size={60} color="#0E346A" />}
        addArrowClickHandler
        breakpoints={{
          640: {
            slidesPerPage: 1,
            arrows: false,
          },
          900: {
            slidesPerPage: 2,
            arrows: false,
          },
        }}
      >
        {products.map(product => (
          <Container>
            <Content>
              <Link to={`/item/${product.id}`} key={product.id}>
                <img src={product.image_url} alt="Produto" />
                <h1>{product.title}</h1>
                <strong>R$ {product.price}</strong>
                <span>{product.type}</span>
              </Link>
            </Content>
          </Container>
        ))}
      </Carousel>
    )
  );
};

export default Slider;
