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

interface RepositoryParams {
  id: string;
}

const Product: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<IItem>();
  const { params } = useRouteMatch<RepositoryParams>();
  const imageNotFound: string = "https://media.istockphoto.com/vectors/error-404-page-not-found-vector-id673101428?k=6&m=673101428&s=170667a&w=0&h=xr8E71CR8ZabAwW7ku9RRy8xFJqp3Pq-gaMDnD6Qh1c=";

  useEffect(() => {
    setLoading(true);
    api
      .get(`/produtos/${params.id}`)
      .then(response => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    setLoading(false);
  }, [params.id]);

  // Remove tudo exceto números
  const contactLink = post?.contato?.replace(/[^\d]+/g, '');

  function maskPhone(v:string = ""){
    v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
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
              src={post?.miniatura?.includes("http")? post.miniatura : imageNotFound}
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
