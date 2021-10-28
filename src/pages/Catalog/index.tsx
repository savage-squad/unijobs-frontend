import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import { Container, Content, Pages, Informations } from './styles';

import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import { IItem } from '../../services/types';

import ScrollToTopOnMount from '../../utils/ScrollToTopOnMount';

interface RepositoryParams {
  page: string;
  itemType: string;
  categorie: string;
  categorieId: string;
}

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<IItem[]>([]);
  const [page, setNextPage] = useState('');
  const { params } = useRouteMatch<RepositoryParams>();
  const [loading, setLoading] = useState(false);

  const imageNotFound = 'https://imgur.com/sM05PIm';
  useEffect(() => {
    setLoading(true);
    if (params.categorie) {
      api
        .get(
          `/${params.categorie}/${params.categorieId}/${params.itemType}?page=${params.page}&size=5`,
        )
        .then(response => {
          setProducts(response.data);
        })
        .catch(e => {
          throw e;
        });
      setLoading(false);
    } else {
      api
        .get(`/${params.itemType}?page=${params.page}&size=5`)
        .then(response => {
          setProducts(response.data.content);
        })
        .catch(e => {
          throw e;
        });
      setLoading(false);
    }
    const nextPage = parseInt(params.page) + 1;
    setNextPage(nextPage.toString());
    setLoading(false);
  }, [params.itemType, params.page]);

  const history = useHistory();

  return (
    <>
      <ScrollToTopOnMount />
      <Loading loading={loading} />
      <Banner backIcon />
      <Container>
        {products &&
          products.map(product => {
            return (
              <Content key={product.id}>
                <Link
                  to={`/item/${params.itemType}/${product.id}`}
                  key={product.id}
                >
                  <img
                    src={
                      product.miniatura?.includes('http')
                        ? product.miniatura
                        : imageNotFound
                    }
                    alt="Produto"
                  />
                  <Informations>
                    <span>{product.type}</span>
                    <h1>{product.titulo}</h1>
                    <p>{product.descricao}</p>
                  </Informations>
                  <strong>R$ {product.preco}</strong>
                </Link>
              </Content>
            );
          })}
      </Container>
      <Pages>
        <button type="button" onClick={history.goBack}>
          <FiChevronLeft size={40} />
        </button>
        <a href={`${page}`}>
          <FiChevronRight size={40} />
        </a>
      </Pages>
      <Footer />
    </>
  );
};

export default Catalog;
