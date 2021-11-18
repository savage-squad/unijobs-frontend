import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

const Sidebar: React.FC = () => (
  <>
    <Container>
      <Link to="/profile">Perfil</Link>
      <Link to="/register">Produtos</Link>
      <Link to="/">Serviços</Link>
      <Link to="/">Meus Anúncios</Link>
    </Container>
  </>
);

export default Sidebar;
