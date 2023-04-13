import "./styles.css";
import { Button } from "../Button/Button";
import { useContext, useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider"

export function Login() {

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  async function handdleSubmit(e){
    e.preventDefault();
    try{
      await auth.login(username, password)
      navigate("/usuario");
    } catch (err) {
      setErrorMsg(err.response.data.error);
    }
  }
  
  useEffect(()=>{
    setErrorMsg("");
  },[username, password])

  return (
    <form onSubmit={handdleSubmit} className="login-form">
      <h1>Login</h1>
      <img
        src="https://careers.ng.cash/static/media/logo_ng_cash.38841a96a95927fdf7bf.gif"
        alt="ngcash-logo"
      />
      <section>
        <label>
          Nome de usuário
          <input 
          type="text" 
          onChange={(e)=> setUsername(e.target.value)} 
          value={username}
          placeholder="seu usuário"
          required
          />
        </label>
        <label>
          Senha
          <input 
          type="password"
          onChange={(e)=> setPassword(e.target.value)} 
          value={password}  
          placeholder="sua senha aqui"
          required
          />
        </label>
        <p className={errorMsg?"":"hidden"}>{errorMsg}</p>
        <div>
          <Button text="entrar" classe="purple-btn" />
          <a href="/">voltar</a>
        </div>
      </section>
    </form>
  );
}
