import React, { createContext, useState } from 'react';
import { useApi } from '../hooks/useApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const api = useApi();

  const signin = async (username, password) => {
    const data = api.signin(username, password);
    if(data.user && data.token){
      setUser(data.user)
    }
    return data
  }

  const login = async (username, password) => {
    const data = await api.login(username, password);
    if(data.user && data.token){
      setUser(data.user)
      setToken(data.token)
    }
    return data
  }

  const payment = async(creditee, value) => {
    const data = await api.payment(user.username, creditee, value, token);
    return data
  }

  const transaction = async () => {
    const data = await api.transaction(token);
    return data
  }
  const getUserData = async () => {
    const data = await api.getUserData(token);
    return data
  }

  const logout = async () => {
    setUser(null);
    setToken("");
    return true;
  }

  return(
    <AuthContext.Provider value={{user, token, login, signin, logout, getUserData, payment, transaction}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;