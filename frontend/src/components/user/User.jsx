import { useState, useContext } from 'react';
import Main from '../template/Main';
import avatar from '../../assets/imgs/avatar.png'

import { AuthContext } from '../../contexts/auth';
import firebase from '../../service/firebaseConnection';

import { toast } from 'react-toastify';
import { FiSettings, FiUpload } from 'react-icons/fi';

import './user.css'

const headerProps = {
    title: 'Cadastro de usuário',
}

export default function User() {

    const { signUp, user, SignIn, setUser } = useContext(AuthContext);

    const [nome, setName] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)
    const [password, setPassword] = useState('')

    const [avataUrl, setAvataUrl] = useState(user && user.avataUrl)
    const [imageAvata, setImageAvata] = useState(null);

    async function save(e) {
        e.preventDefault();
        if (nome !== '' && email !== '' && password !== '') {
            signUp(email, password, nome, avataUrl);
        }
    }

    const clear = () => {
        setName('')
        setEmail('')
        setAvataUrl('*******')
        setImageAvata()
    }

    const getUpdatedList = (user, add = true) => {
        return null
    }

    const load = (user) => {
        return null
    }

    const remove = (user) => {
        return null
    }

    const handelFile = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvata(image);
                setAvataUrl(URL.createObjectURL(e.target.files[0]));

            } else {
                toast("Tipo de imagem não permitida");
                setImageAvata(null)
                return null;
            }
        }
    }

    const handleUpload = () => {

    }

    const renderForm = () => {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={nome}
                                onChange={e => setName(e.target.value)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input
                                type=""
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Digite sua senha..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="*********" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className='container'>
                            <div className="form-profile">
                                <label className="label-avatar">
                                    <span>
                                        <FiUpload color='#FFF' size={25} />
                                    </span>

                                    <input type="file" accept='image/*' onChange={handelFile} /><br />
                                    {avataUrl === null ?
                                        <img src={avatar} width="100" height="100" alt='Avata user' />
                                        :
                                        <img src={avataUrl} width="250" height="250" alt='Avata user' />
                                    }
                                </label>
                            </div>
                        </div>
                    </div>

                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button
                            className="btn btn-primary"
                            onClick={e => save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const renderTable = () => {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {renderRows()} */}
                </tbody>
            </table>
        )
    }

    const renderRows = () => {
        return SignIn.map(u => {
            return (
                <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => load(u)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => remove(u)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <Main {...headerProps}>
            {renderForm()}
            {renderTable()}
        </Main >
    )

}