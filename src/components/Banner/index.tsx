import React, { ChangeEventHandler, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { FiChevronLeft } from 'react-icons/fi';

import { Header } from './styles';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import StorageConstants from '../../constants/StorageConstants';

interface BannerProps {
  backIcon: boolean;
}

const Banner: React.FC<BannerProps> = ({ backIcon }) => {
  const history = useHistory();
  const { signOut } = useAuth();
  const [search, setSearch] = useState<string>('');

  function renderBackIcon(value: boolean) {
    if (value) {
      return (
        <button type="button" onClick={history.goBack}>
          <FiChevronLeft size={35} />
        </button>
      );
    }
  }

  const handleClick = () => {
    signOut();
  };

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value as string);
  };

  const submitSearch = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLSpanElement>,
  ) => {
    history.push(`/products/${search}`);
    event.preventDefault();
  };

  const isLogged = !!localStorage.getItem(StorageConstants.TOKEN);

  return (
    <Header>
      {renderBackIcon(backIcon)}
      <Link to="/" style={{ flex: '' }}>
        <img src={logo} alt="Logo UniJobs" />
      </Link>
      <form
        className="searchbar-form"
        onSubmit={submitSearch}
        style={{ width: '40%' }}
      >
        <div className="searchbar">
          <input
            minLength={3}
            maxLength={50}
            value={search}
            onChange={onChangeSearch}
            placeholder="Pesquise um serviço..."
          />
          <span onClick={submitSearch} />
        </div>
      </form>
      {isLogged ? (
        <div className="menu">
          <Link to="/register">Anunciar</Link>
          <Link to="/login" onClick={handleClick}>
            Sair
          </Link>
        </div>
      ) : (
        <div className="menu">
          <Link to="/register">Anunciar</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </Header>
  );
};

export default Banner;
