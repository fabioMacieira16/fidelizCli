import api from "../../services/api";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "../../styles/login/register.css";

export default function User() {
  
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [adress, setAdress] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState("");
  const history = useHistory();

  async function handleCadastroRestaurante(e) {
    e.preventDefault();

    const data = {
      name,
      password,
      adress,
      email,
      number,
      description,
    };

    try {
      const response = await api.post("estabelecimentos/create", data);

      alert(
        `Seu restaurante foi cadastrado com sucesso, use seu e-mail e senha para logar.`
      );
      console.log(response.data.name);

      history.push("/");
    } catch (err) {
      alert(`Erro no cadastro, tente novamente.`);
      console.log(err);
    }
  }

  return (
    <div className="cadastro-container">
      <Link className="back-link" to="/">
        <FiArrowLeft size={25} color="#FFF" />
      </Link>
      <form className="content" onSubmit={handleCadastroRestaurante}>
        <h1>Cadastre seu Usuario</h1>
        <div className="grupo">
          <section className="lados">
            <section>
              <p>Nome</p>
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </section>

            <section>
              <div className="linha">
                <section>
                  <p>Senha</p>
                  <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <p>Confirmar Senha</p>
                  <input type="password" placeholder="Senha" />
                </section>
              </div>
            </section>

            <section>
              <p>Endereço</p>
              <input
                type="text"
                placeholder="Endereço"
                value={adress}
                onChange={e => setAdress(e.target.value)}
              />
            </section>
            <section>
              <p>Número de Telefone</p>
              <input
                placeholder="(XX) XXXXX-XXXX"
                value={number}
                onChange={e => setNumber(e.target.value)}
              />
            </section>
          </section>

          <section className="lados">
            <section>
              <p>E-mail</p>
              <input
                className="email"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </section>

            <section>
              <p>Confirmação de E-mail</p>
              <input
                className="email" type="email" placeholder="E-mail" />
            </section>

            <section>
              <p>Descrição</p>
              <textarea
                className="descri"
                placeholder="Descrição"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </section>

          </section>
        </div>
        <button className="button" type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}