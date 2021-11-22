import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { IItem } from '../../services/types';
import {
  Content,
  Item,
  Images,
  InfoContact,
  Description,
  Buttons,
  Price,
} from './styles';

import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import api from '../../services/api';
import ScrollToTopOnMount from '../../utils/ScrollToTopOnMount';
import applicationContext from '../../config/ApplicationContext';

interface RepositoryParams {
  id: string;
  itemType: string;
}

const Product: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<IItem>();
  const { params } = useRouteMatch<RepositoryParams>();
  const imageNotFound = 'https://i.imgur.com/sM05PIm.png';

  useEffect(() => {
    setLoading(true);

    api
      .get(`/${params.itemType}/${params.id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(e => {
        throw e;
      });
    setLoading(false);
  }, [params.id]);

  // Remove tudo exceto números
  const contactLink = post?.contato?.replace(/[^\d]+/g, '');

  function maskPhone(v = '') {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2'); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, '$1-$2'); //Coloca hífen entre o quarto e o quinto dígitos
    return v;
  }

  return (
    <>
      <ScrollToTopOnMount />
      <Loading loading={loading} />
      <Banner backIcon />
      <Content>
        <Item>
          <Images>
            <img
              src={
                post?.miniatura?.includes('http')
                  ? post.miniatura
                  : imageNotFound
              }
              alt={post?.title}
            />
          </Images>

          <InfoContact>
            <p>
              Por: <strong>{post?.anunciante}</strong>
            </p>
            <h1>{post?.titulo}</h1>

            <Price>
              <p>Preço: </p>
              <span>R$ {post?.preco}</span>
            </Price>
            <Buttons>
              <a
                href={`http://wa.me/55${contactLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={25} style={{ marginRight: 12 }} />
                {maskPhone(post?.contato)}
              </a>
            </Buttons>
          </InfoContact>

          <Description>
            <h4>Descrição</h4>
            <p>{post?.descricao}</p>
          </Description>
        </Item>
      </Content>
      <Footer />
    </>
  );
};

export default Product;
