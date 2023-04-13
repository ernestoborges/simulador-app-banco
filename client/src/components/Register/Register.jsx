import "./styles.css";
import { Button } from "../Button/Button";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider"

const USERNAME_REGEX = new RegExp('(?=.{3,})');
const PASSWORD_REGEX = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.{8,})');

export function Register() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [validUsername, setvalidUsername] = useState(false);
  const [validPassword, setvalidPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(()=>{
    setvalidUsername(USERNAME_REGEX.test(username))
  },[username])

  useEffect(()=>{
    setvalidPassword(PASSWORD_REGEX.test(password))
  },[password])

  async function handdleSubmit(e) {
    e.preventDefault();
    try{
      await auth.signin(username, password)
      navigate("/usuario");
    } catch (err) {
      setErrorMsg(err.response.data.error);
    }
  }

  return (
    <form onSubmit={handdleSubmit} className="register-form">
      <h1>Criar conta</h1>
      <h3>
        Para criar sua conta, escolha um nome de <span>usuário</span> e{" "}
        <span>senha</span> :)
      </h3>
      <section>
        <label>
          Nome de usuário
          <input
            type="text"
            placeholder="o usuário para acessar sua conta"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div>
            <span className={username && !validUsername ? "" : "hidden"}>Usuario no mínimo com 3 caracteres.</span>
          </div>
        </label>
        <label>
          Senha
          <input
            type="password"
            placeholder="a senha para acessar sua conta"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div>
            <span className={password && !validPassword ? "" : "hidden"}>Pelo menos 1 letra maiúscula, 1 número e 8 caracteres.</span>
          </div>
        </label>
      </section>
      <p className={errorMsg?"":"hidden"}>{errorMsg}</p>
      <div>
        <Button disabled={ !validUsername || !validPassword} classe="purple-btn" text="continuar" />
        <a href="/">voltar</a>
      </div>
    </form>
  );
}
