import { useContext } from 'react';
import { Link } from 'react-router-dom';
import avata from '../../assets/imgs/avatar.png';
import { AuthContext } from '../../contexts/auth'

import './avata.css';

export default function Avata() {

    const { user } = useContext(AuthContext)

    return (
        <aside className="avata">
            <Link to="/users" className="avata">
                <img src={user.avataUrl === null ? avata : user.avataUrl} alt="avatar" />
                <label className='user-datails'>{user.nome}</label>
            </Link>
        </aside>
    )
}