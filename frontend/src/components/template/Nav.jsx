import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './nav.css';
import { faAlignLeft, faArrowRightFromBracket, faCoffee, faUsers } from '@fortawesome/free-solid-svg-icons';

export default function Nav() {

    const { signOut } = useContext(AuthContext);

    return (
    //Icones da barra de menu
        <aside className="menu-area">
            <nav className="menu">
                <Link to="/">
                    <i className={`fa fa-home`}></i>  Início
                </Link>
                <Link to="/cardapios">
                    <i className={`fa solid fa-bars`}></i>  Cardapio
                </Link>
                <Link to="/tabStore">
                   <i className={`fa fa-tag`}></i>   Lojas
                </Link>
                <Link to="/users">
                 <i className={`fa fa-user`}></i>   Usuário
                </Link>
                <Link to="/customer">
                <FontAwesomeIcon icon={faUsers}/> Clientes
                </Link>
                <Link to="" onClick={() => signOut()}>
                  <FontAwesomeIcon icon={faArrowRightFromBracket}/>  Sair
                </Link>
            </nav>
        </aside>
    )
}