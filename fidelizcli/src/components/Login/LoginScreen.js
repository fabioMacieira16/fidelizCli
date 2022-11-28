import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import "../../styles/login/login.css";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {

      const response = await api.post('/sessions', { email, password });

      localStorage.setItem("name", response.data.name);
      localStorage.setItem("estabelecimento_id", response.data.id);

      // history.push("/menu");
      history.push("/");
      console.log(`${response.data.id}`);
      console.log(`Login no ${response.data.name} foi feito com sucesso`);
    } catch (err) {

      alert("Falha no login, tente novamente.");

      console.log(err)
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h1>SEI</h1>
        <p>Sistema </p>

        <input
          type="e-mail"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="button" type="submit">
          Login
        </button>

        <a href="/Register">Cadastre-se</a>
      </form>
    </div>
  );
}