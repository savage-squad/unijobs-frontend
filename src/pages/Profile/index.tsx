import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';
import {
  TabView, TabPanel
} from 'primereact/tabview'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import {
  ContainerRoot,
  Foot,
} from './styles';

import MeuPerfil from '../../components/Profile';
import AtualizarSenha  from '../../components/Password';
import Banner from '../../components/Banner';

import Footer from '../../components/Footer';
import Menu from '../../components/Sidebar';

import Loading from '../../components/Loading';
import ScrollToTopOnMount from '../../utils/ScrollToTopOnMount';
const Profile: React.FC = () => {
  const [loading, setLoading] = useState(false);

  
  const handleUpdateProfile = useCallback(async data => {
    alert('Implementar atualizar perfil')
  }, []);

  
  const handleUpdatePassword = useCallback(async data => {
    alert('Implementar atualizar senha')
    
  }, []);



  return (
    <>
      <ScrollToTopOnMount />
      <Loading loading={loading} />
      <div style={{ width: '100vw', height: '100vh' }}>
        <Banner backIcon />
        <ContainerRoot>
          <Menu />
          <TabView>

            <TabPanel header="Perfil">
              <MeuPerfil onSubmit ={handleUpdateProfile} />
            </TabPanel>


            <TabPanel header="Segurança">

              <AtualizarSenha onSubmit={handleUpdatePassword} />

            </TabPanel>

          </TabView>

          <Foot>
            <Footer />
          </Foot>
        </ContainerRoot>
      </div>
    </>
  );
};

export default Profile;
