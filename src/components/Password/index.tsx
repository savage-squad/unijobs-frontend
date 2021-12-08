import React, { useCallback, useState} from 'react';
import { Form } from '@unform/web';
import { IoMdLock } from 'react-icons/io';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';


import {

    FormGrid,
    Formbox,
    Buttons,
    InputBox,
} from './styles';

import Input from '../../components/Input';

import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationsErrors';

interface InputProps { 
    onSubmit: Function
}



const UpdateSenha: React.FC<InputProps> = ({onSubmit}) => {
    const [loading, setLoading] = useState(false);
  


    const { addToast } = useToast();


    const handleSubmit = useCallback(
        async (data: object) => {
            setLoading(true);
            try {
            
                const schema = Yup.object().shape({
                    currentPassword: Yup.string().required('A senha é obrigatoria'), 
                    newPassword: Yup.string().required('A Nova senha deve ser preenchida'),
                    passwordConfirm: Yup.string()
                    .oneOf([Yup.ref('newPassword') ], 'As senhas não coincidem')
                    
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

                    <Formbox>
                        <legend>Senha</legend>
                        <InputBox>
                            <Input
                                label="Senha atual"
                                icon={IoMdLock}
                                name="currentPassword"
                                type="password"
                            />
                            <Input
                                label="Nova Senha"
                                icon={IoMdLock}
                                name="newPassword"
                                type="password"
                            />
                            <Input
                                label="Repita a senha"
                                icon={IoMdLock}
                                name="passwordConfirm"
                                type="password"
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

export default UpdateSenha;
