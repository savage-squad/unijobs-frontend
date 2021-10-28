import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';
import jwt_decode from 'jwt-decode';

interface User {
  id: number;
  nome: string;
}
interface AuthState {
  token: string;
  // refreshToken: string;
  user?: User;
}

interface SignInCredentails {
  email: string;
  password: string;
}

interface AuthContextData {
  token: string;
  // refreshToken: string;
  user?: User;
  signIn(credentails: SignInCredentails): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@UniJobs:token');

    // const refreshToken = localStorage.getItem('@UniJobs:refreshToken');
    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      const decoded: any = jwt_decode(token);
      const user: any = { id: decoded.id_usuario, nome: decoded.nome };
      return { token, user };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/authenticate', {
      email,
      password,
    });

    const token = response.data.token;
    const decoded: any = jwt_decode(token);
    const user: any = { id: decoded.id_usuario, nome: decoded.nome };
    localStorage.setItem('@UniJobs:token', token);

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@UniJobs:token');
    localStorage.removeItem('@UniJobs:user');
    // localStorage.removeItem('@UniJobs:refreshToken');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        // refreshToken: data.refreshToken,
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

export { AuthProvider, useAuth };
