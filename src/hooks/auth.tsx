import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';
import jwt_decode from 'jwt-decode';
import axios, { AxiosResponse } from 'axios';
import applicationContext, { Module } from '../config/ApplicationContext';
import StorageConstants from '../constants/StorageConstants';
interface Role {
  authority: string;
}
interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  ra: string;
}
interface AuthState {
  token: string;
  user?: User;
}

interface SignInCredentails {
  email: string;
  password: string;
}

interface AuthContextData {
  token: string;
  user?: User;
  signIn(credentails: SignInCredentails): Promise<void>;
  signOut(): void;
}

interface AuthenticationData {
  access_token: string;
  refresh_token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(StorageConstants.TOKEN);

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      const decoded: any = jwt_decode(token);
      const user: any = {
        id: decoded.id_usuario,
        nome: decoded.nome,
        telefone: decoded.celular,
        ra: decoded.ra,
        email: decoded.sub,
      };
      return { token, user };
    }

    return {} as AuthState;
  });

  React.useEffect(() => {
    let token = null;
    if ((token = localStorage.getItem(StorageConstants.TOKEN))) {
      createApplicationContext(token);
    }
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post<any, AxiosResponse<AuthenticationData>>(
      '/authenticate',
      {
        email,
        password,
      },
    );

    const token = response.data.access_token;
    const refreshToken = response.data.refresh_token;
    createApplicationContext(token);

    const decoded: any = jwt_decode(token);
    const user: any = {
      id: decoded.id_usuario,
      nome: decoded.nome,
      telefone: decoded.celular,
      ra: decoded.ra,
      email: decoded.sub,
    };

    localStorage.setItem(StorageConstants.TOKEN, token);
    localStorage.setItem(StorageConstants.REFRESH_TOKEN, refreshToken);
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(StorageConstants.TOKEN);
    localStorage.removeItem(StorageConstants.REFRESH_TOKEN);
    localStorage.removeItem(StorageConstants.USER);
    applicationContext.destroy();
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
async function authenticateWithRefreshToken() {
  return new Promise((accept, reject) => {
    delete api.defaults.headers.common['authorization'];
    const refreshToken = localStorage.getItem(StorageConstants.REFRESH_TOKEN);
    const params = { refresh_token: refreshToken };
    axios
      .post<AuthenticationData>('/refresh_token', undefined, {
        params,
        baseURL: process.env.REACT_APP_BASE_URL,
      })
      .then(({ data }) => {
        const { refresh_token, access_token } = data;
        localStorage.setItem(StorageConstants.TOKEN, access_token);
        localStorage.setItem(StorageConstants.REFRESH_TOKEN, refresh_token);
        accept(access_token);
      })
      .catch(reject);
  });
}

function handlerRefreshTokenInterceptor() {
  api.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const token = localStorage.getItem(StorageConstants.TOKEN);
      if (error.response.status === 401 && token) {
        try {
          const token = await authenticateWithRefreshToken();
          error.config.headers['Authorization'] = `Bearer ${token}`;
          return axios.request(error.config);
        } catch (err) {
          localStorage.removeItem(StorageConstants.TOKEN);
          delete api.defaults.headers.common['authorization'];
          return Promise.reject(error);
        }
      }
      delete api.defaults.headers.common['authorization'];
      return Promise.reject(error);
    },
  );
}
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

function createApplicationContext(jwtToken: string) {
  const decoded: any = jwt_decode(jwtToken);
  applicationContext.setModules(mapperRoles(decoded.roles));
}

function mapperRoles(roles: Role[]): Module[] {
  if (roles === null) {
    return [];
  }
  const userRoles: Module[] = roles.map(parseModule);

  return userRoles;
}

function parseModule(role: Role): Module {
  return {
    code: role.authority,
    name: role.authority,
  } as Module;
}

export { AuthProvider, useAuth, handlerRefreshTokenInterceptor };
