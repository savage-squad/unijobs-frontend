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
// interface Product {
//   _id: string;
//   title: string;
//   description: string;
//   price: string;
//   type: string;
//   image: string[];
// }

interface RepositoryParams {
  page: string;
  itemType: string;
}

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<IItem[]>([]);
  const [page, setNextPage] = useState('');
  const { params } = useRouteMatch<RepositoryParams>();
  const [loading, setLoading] = useState(false);

  const imageNotFound: string = "https://imgur.com/sM05PIm";

  const { itemType } = params;

  function splitString(stringToSplit: string, separator: string) {
    const arrayOfStrings = stringToSplit.split(separator);
    return arrayOfStrings;
  }

  useEffect(() => {
    setLoading(true);
    if (itemType) {
      const separetedCategorie = splitString(itemType, '/');
      console.log(`${separetedCategorie[0]}?page=${params.page}`);
      if (separetedCategorie.length === 2) {
        api
          .get(
            `/${separetedCategorie[0]}/${separetedCategorie[1]}/${params.page}`,
          )
          .then(response => {
            setProducts(response.data.data);
          })
          .catch(e => {
            console.log(e);
          });
        setLoading(false);
      } else {
        api
          .get(`/${separetedCategorie[0]}?page=${params.page}&size=5`)
          .then(response => {
            setProducts(response.data.content);
          })
          .catch(e => {
            console.log(e);
          });
        setLoading(false);
      }
    } else {
      api
        .get(`/items/${params.page}`)
        .then(response => {
          setProducts(response.data.data);
        })
        .catch(e => {
          console.log(e);
        });
      setLoading(false);
    }
    const nextPage = parseInt(params.page) + 1;
    setNextPage(nextPage.toString());
    setLoading(false);
  }, [itemType, params.itemType, params.page]);

  const history = useHistory();

  return (
    <>
      <ScrollToTopOnMount />
      <Loading loading={loading} />
      <Banner backIcon />
      <Container>
        {products && products.map(product => {
          return (
            <Content key={product.id}>
              <Link to={`/item/${product.id}`} key={product.id}>
                <img
                  src={product.miniatura?.includes("http")? product.miniatura : imageNotFound}
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
