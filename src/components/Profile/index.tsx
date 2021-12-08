import React, { useCallback, useState } from 'react';
import { Form } from '@unform/web';
import { IoMdCall, IoMdPeople, IoIosMail } from 'react-icons/io';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationsErrors';
import { useToast } from '../../hooks/toast';

import {

    FormGrid,
    Formbox,
    Buttons,
    InputBox,
} from './styles';

import Input from '../../components/Input';

import Button from '../../components/Button';

interface InputProps { 
    onSubmit: Function
}

const Perfil: React.FC<InputProps> = ({onSubmit}) => {
    const [loading, setLoading] = useState(false);
  

    const { user } = useAuth();

    const { addToast } = useToast();




    const handleSubmit = useCallback(
        async (data: object) => {
            setLoading(true);
            try {
                const schema = Yup.object().shape({
                    nome: Yup.string().required('Nome deve estar preenchido'),
                    ra: Yup.string().required('Ra deve estar preenchido'),
                    telefone: Yup.string(),
                    email: Yup.string().required('Email deve estar preenchido'),
                  
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                onSubmit(data);
            } catch (error) {
                if (error instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(error);
                   Object.values(errors).forEach(msg => {
                    addToast({
                        type: 'error',
                        title: 'Atenção',
                        description: msg,
                      });
                   });
          
                  }
                
            }
            setLoading(false);
        },
        [onSubmit],
    );

    return (
        <>

            <Form onSubmit={handleSubmit}>
                <FormGrid>



                    {/* <Formbox>
                    <legend>Imagem de perfil</legend>
                    <InputBox>
                      <Input label="Carregar Imagem" name="images" type="file" />
                    </InputBox>
                  </Formbox>*/}

                    <Formbox>
                        <legend>Sobre Mim</legend>
                        <InputBox>
                            <Input
                                label="Nome Completo"
                                defaultValue={user?.nome}
                                name="nome"
                                type="text"
                                icon={IoMdPeople}
                            />
                            <Input
                                defaultValue={user?.ra}
                                label="R.A"
                                help="Digite seu Registro Academico da UniAmérica"
                                icon={IoMdPeople}
                                name="ra"
                                type="text"
                            />
                        </InputBox>
                    </Formbox>

                    <Formbox>
                        <legend>Detalhes de Contato</legend>
                        <InputBox>
                            <Input
                                defaultValue={user?.telefone}
                                label="Telefone Principal"
                                icon={IoMdCall}
                                name="telefone"
                                type="text"
                            />
                            <Input
                                disabled
                                label="Email"
                                defaultValue={user?.email}
                                icon={IoIosMail}
                                name="email"
                                type="email"
                            />
                        </InputBox>
                    </Formbox>

                    <Buttons>

                        <Button type="submit">Atualizar</Button>
                    
                    </Buttons>
                </FormGrid>
            </Form>


        </>
    );
};

export default Perfil;
