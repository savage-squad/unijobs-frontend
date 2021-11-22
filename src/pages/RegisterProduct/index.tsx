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
import fileApi from '../../services/fileApi';
import applicationContext from '../../config/ApplicationContext';
import { isAdmin } from '../../utils/utils';

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

interface FreeImageItem {
  image: { url: string };
}

const RegisterProduct: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [currency, setCurrency] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [img1, setImg1] = useState<File>();
  // const [img2, setImg2] = useState<File>({} as File);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const ctx = useAuth();

  const handleCreateProduct = async (data: ItemProps) => {
    const formData = new FormData();
    formData.append('miniatura', img1 as File, img1?.name);

    const item = {
      titulo: data.titulo,
      descricao: data.descricao,
      id_tipo_produto: data.id_tipo_produto,
      preco: data.preco,
      prazo: data.prazo,
      id_usuario: ctx.user?.id,
    };

    Object.keys(item).forEach(key => {
      //@ts-ignore
      formData.append(key, item[key]);
    });

    if (!item) {
      setLoading(true);
    }

    await api.request({
      url: '/produtos',
      method: 'POST',
      data: formData,
    });

    setLoading(false);
    history.push('/');

    addToast({
      title: 'Produto criado',
      description: 'Seu produto foi criado com sucesso!',
      type: 'sucess',
    });
  };

  const handleImage1 = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImg1(event.target.files[0]);
    }
  }, []);

  const handleCurrencyMoney = useCallback(async (money: string) => {
    const moneyFormated = Number(money.replace(/[^0-9.-]+/g, ''));

    return moneyFormated;
  }, []);

  const handleSubmit = async (data: ItemProps) => {
    data.preco = await handleCurrencyMoney(currency);
    try {
      const schema = Yup.object().shape({
        titulo: Yup.string().required(),
        descricao: Yup.string().required(),
        preco: Yup.string().required(),
        prazo: Yup.string().required(),
        id_tipo_produto: Yup.string().required(),
        miniatura: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      handleCreateProduct(data);
    } catch (err) {
      throw err;
    }
  };

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(true);
  }, []);

  const [productTypes, setProductsTypes] = useState<TypeProductProps[]>([]);
  useEffect(() => {
    api
      .get('/tipos_produtos')
      .then(response => {
        const arrayLabelNome = response.data.map((item: any) => ({
          value: item.id_tipo_produto,
          label: item.nome,
        }));
        setProductsTypes(arrayLabelNome);
      })
      .catch(error => {
        throw error;
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
                <Input
                  name="prazo"
                  type="number"
                  placeholder="Prazo de entrega (Em dias)"
                />
                <PrecoArea isFilled={isFilled} isFocused={isFocused}>
                  <span>Preço</span>
                  <CurrencyInput
                    name="preco"
                    prefix="R$"
                    value={currency}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChangeEvent={(event: ChangeEvent<HTMLInputElement>) =>
                      setCurrency(event.target.value)
                    }
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
                  onChange={handleImage1}
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
