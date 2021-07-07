import React, { ChangeEvent, useCallback, useState, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import CurrencyInput from 'react-currency-input';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import ScrollToTopOnMount from '../../utils/ScrollToTopOnMount';

import {
  ContainerRoot,
  Formarea,
  PrecoArea,
  Title,
  Formbox,
  Buttons,
} from './styles';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Sidebar from '../../components/Sidebar';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { useEffect } from 'react';
import product from '../../services/product';
import { useAuth } from '../../hooks/auth';

interface ItemProps {
  // title: string;
  titulo?: string;
  miniatura?: string;
  descricao?: string;
  preco?: number;
  prazo?: number;
  id_tipo_produto: number;
  // description: string;
  // item_type: string;
  // item_category: string;
  // price: number;
  // thumbnail_id: number;
  // thumbnail_url: string;
  // image_id: number;
  // image_url: string;
}

interface TypeProductProps {
  value: number;
  label: string;
}

const RegisterProduct: React.FC = () => {
  const ctx = useAuth();
  console.log(ctx);
  const { addToast } = useToast();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [currency, setCurrency] = useState<string>('');
  const [loading, setLoading] = useState(false);
  // const [img1, setImg1] = useState<File>({} as File);
  // const [img2, setImg2] = useState<File>({} as File);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleCreateProduct = useCallback(
    async (data: ItemProps) => {
      console.log(data);

      // const imagem1 = new FormData();
      // imagem1.append('file', img1);
      // const apiImg1 = await api.post('/files', imagem1);

      // const imagem2 = new FormData();
      // imagem2.append('file', img2);
      // const apiImg2 = await api.post('/files', imagem2);

      const item = {
        // title: data.title,
        titulo: data.titulo,
        // description: data.description,
        descricao: data.descricao,
        // item_type: data.item_type,
        // item_category: data.item_category,
        id_tipo_produto: data.id_tipo_produto,
        // price: data.price,
        preco: data.preco,
        prazo: data.prazo,
        miniatura: data.miniatura,
        // thumbnail_id: apiImg1.data.id,
        // thumbnail_url: apiImg1.data.url,
        // image_id: apiImg2.data.id,
        // image_url: apiImg2.data.url
      };

      if (!item) {
        setLoading(true);
      }

      await api.post('/produtos', item);
      setLoading(false);
      history.push('/');
      
      addToast({
        title: 'Produto criado',
        description: 'Seu produto foi criado com sucesso!',
        type: 'sucess',
      });
    },
    [addToast, history], //, img1, img2
  );

  // const handleImage1 = useCallback((event: ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     setImg1(event.target.files[0]);
  //   }
  // }, []);

  // const handleImage2 = useCallback((event: ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     setImg2(event.target.files[0]);
  //   }
  // }, []);

  const handleCurrencyMoney = useCallback(async (money: string) => {
    const moneyFormated = Number(money.replace(/[^0-9.-]+/g, ''));

    return moneyFormated;
  }, []);

  const handleSubmit = useCallback(
    async (data: ItemProps) => {
      setLoading(true);
      data.preco = await handleCurrencyMoney(currency);
      try {
        const schema = Yup.object().shape({
          // title: Yup.string().required(),
          titulo: Yup.string().required(),
          // description: Yup.string().required(),
          descricao: Yup.string().required(),
          // price: Yup.number().required(),
          preco: Yup.string().required(),
          prazo: Yup.string().required(),
          // item_type: Yup.string().required(),
          id_tipo_produto: Yup.string().required(),
          miniatura: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        handleCreateProduct(data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
      
    },
    [handleCreateProduct, handleCurrencyMoney, currency],
  );

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(true);
  }, []);
  
  const [productTypes, setProductsTypes] = useState<TypeProductProps[]>([]);
  useEffect(() => {
    api.get("/tipos_produtos")
    .then(response => {
      const arrayLabelNome = response.data.map((item:any) => ({
          value:item.id_tipo_produto,
          label:item.nome
        })
      );
      setProductsTypes(arrayLabelNome); 
    })
    .catch(error => {
      console.log(error);
    });
    
  }, []);

  return (
    <>
      <ScrollToTopOnMount />
      <Loading loading={loading} />
      <div style={{ width: '100vw' }}>
        <Banner backIcon />
        <ContainerRoot>
          <Sidebar />
          <Formarea>
            <Title>Adicionar Produto</Title>
            <Formbox>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <Input name="titulo" placeholder="Titulo" type="text" />
                <Input name="descricao" placeholder="Descrição" type="text" />
                <Input name="prazo" type="number" placeholder="Prazo de entrega (Em dias)" />
                <PrecoArea isFilled={isFilled} isFocused={isFocused}>
                  <span>Preço</span>
                  <CurrencyInput
                    name="preco"
                    prefix="R$"
                    value={currency}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChangeEvent={(event: ChangeEvent<HTMLInputElement>) =>
                      setCurrency(event.target.value)}
                  />
                </PrecoArea>
                <Select
                  name="id_tipo_produto"
                  options={productTypes}
                  label="Categoria do item"
                />
                <Input
                  name="miniatura"
                  type="file"
                  label="Thumbnail"
                />
                <Buttons>
                  <Button type="submit">Salvar</Button>
                  <Button type="button">Cancelar</Button>
                </Buttons>
              </Form>
            </Formbox>
          </Formarea>
        </ContainerRoot>
        <Footer />
      </div>
    </>
  );
};

export default RegisterProduct;
