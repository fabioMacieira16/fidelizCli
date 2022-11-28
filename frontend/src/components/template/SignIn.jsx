import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import "./signIn.css"

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { SignIn, loadingAuth } = useContext(AuthContext);

  const save = (e) => {
    e.preventDefault();

    if (email !== '' && password !== '') {
      SignIn(email, password);
    }
  }

  return (
    <div className="container-signIn">
      <div className="wrap-signIn">
        <form className="SignIn-form">
          <span className="signIn-form-title"> Bem vindo </span>

          <span className="signIn-form-title">
            <img src={""} alt="" />
          </span>

          <div className="wrap-input">
            <input
              className={email !== "" ? "has-val input" : "input"}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Email"></span>
          </div>

          <div className="wrap-input">
            <input
              className={password !== "" ? "has-val input" : "input"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Password"></span>
          </div>

          <div className="container-signIn-form-btn">
            <button className="signIn-form-btn" onClick={e => save(e)}>{loadingAuth ? 'Carregando...' : 'Entrar'} </button>
          </div>

          <div className="text-center">
            {/* <span className="txt1"></span> */}
            <a className="txt2" href="#">
             {/* {SignIn.length > 0 ? SignIn : "E-mail ou senha não encontrado." } */}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}