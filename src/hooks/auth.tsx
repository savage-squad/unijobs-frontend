import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';
import jwt_decode from 'jwt-decode';
import { AxiosResponse } from 'axios';
import applicationContext, { Module } from '../config/ApplicationContext';
interface Role {
  authority: string;
}
interface User {
  id: number;
  nome: string;
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
    const token = localStorage.getItem('@UniJobs:token');

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      const decoded: any = jwt_decode(token);
      const user: any = { id: decoded.id_usuario, nome: decoded.nome };
      return { token, user };
    }

    return {} as AuthState;
  });

  React.useEffect(() => {
    let token = null;
    if ((token = localStorage.getItem('@UniJobs:token'))) {
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
    createApplicationContext(token);

    const decoded: any = jwt_decode(token);
    const user: any = { id: decoded.id_usuario, nome: decoded.nome };

    localStorage.setItem('@UniJobs:token', token);
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@UniJobs:token');
    localStorage.removeItem('@UniJobs:user');
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

export { AuthProvider, useAuth };
