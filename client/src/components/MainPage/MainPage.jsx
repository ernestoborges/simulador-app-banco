import { Button } from "../Button/Button";
import { Link } from "react-router-dom";

import "./styles.css";
export function MainPage() {
  return (
    <div className="main-page-container">
      <img
        className="ngcash-logo"
        src="https://careers.ng.cash/static/media/logo_ng_cash.38841a96a95927fdf7bf.gif"
        alt="Ng Cash Logo"
      />
      <Link to="/registrar">
        <Button classe="purple-btn" text="criar conta" />
      </Link>
      <Link to="/login">
        <Button classe="green-btn" text="acessar minha conta" />
      </Link>
    </div>
  );
}
