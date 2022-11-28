import React, { useEffect, useState } from 'react'
import Main from "../template/Main"
import firebase from '../../service/firebaseConnection';
import { toast } from 'react-toastify';
import ModalCustomer from './ModalCustomer';

export default function Customers() {

  const listRef = firebase.firestore().collection('customers').orderBy('created', 'desc');

  const headerProps = {
    icon: `tag`,
    title: 'Clientes',
    subtitle: 'Cadastro de Clientes'
  }

  const [loading, setLoading] = useState(true);
  const [customers, setCostumers] = useState([]);

  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [especialidade, SetEspecialidade] = useState('');
  const [cpfcnpj, setCpfCnpj] = useState('');
  const [descricao, setDescricao] = useState('');
  const [setCreated ] = useState('');

  useEffect(() => {

    loadCustomers()

  }, []);

  async function loadCustomers() {
    await listRef.limit(10)
      .get()
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            especialidade: doc.data().especialidade,
            cpfcnpj: doc.data().cpfcnpj,
            descricao: doc.data().descricao
          })
        })

        setCostumers(lista);
        setLoading(false);

        if (lista.length === 0) {
          setCostumers([{ id: '1', name: 'Cliente fidelidade' }])
          setLoading(false)
          return;
        }
      })
      .catch((error) => {
        setCostumers([{ id: '1', name: 'Cliente fidelidade' }])
        setLoading(false)
      })
  }


  function search(item) {
    setShowPostModal(!showPostModal)
    setDetail(item)
  }

  async function edit(id) {
    await firebase.firestore().collection('customers').doc(id)
      .get()
      .then((spapshot) => {
        setId(id);
        setName(spapshot.data().name);
        setCpfCnpj(spapshot.data().cpfcnpj);
        setDescricao(spapshot.data().descricao);
        SetEspecialidade(spapshot.data().especialidade);

        setIsEdit(true);

      })
      .catch((error) => {
        console.error(error);
        toast.error('Cliente nao existe na base de dados.')
      })
  }

  const clear = () => {
    setName('')
    setCpfCnpj('')
    setDescricao('')
    SetEspecialidade('')
  }

  async function save(e) {
    e.preventDefault();

    if (name !== '' && cpfcnpj !== '' && descricao !== '' && especialidade !== '') {

      if (isEdit) {
        await firebase.firestore().collection('customers').doc(id)
          .update({
            name: name,
            cpfcnpj: cpfcnpj,
            descricao: descricao,
            especialidade: especialidade
          })
          .then(() => {
            loadCustomers()
            toast('Cliente editado com sucesso');
            clear();
          })
          .catch((error) => {
            console.error(error);
            toast.error('Error ao salvar o cliente')
          })
      }
      else {
        await firebase.firestore().collection('customers')
          .add({
            name: name,
            cpfcnpj: cpfcnpj,
            descricao: descricao,
            especialidade: especialidade,
            created: new Date()
          })
          .then(() => {
            loadCustomers()
            toast('Cliente salvo com sucesso');
            clear();
          })
          .catch((error) => {
            console.error(error);
            toast.error('Error ao salvar o cliente')
          })
      }
    }
    else {
      toast.error('Preencha todos os campos');
    }
  }

  const renderForm = () => {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="control-label">Nome<span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Digite o nome de sua loja ..."
                required />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="control-label">Cpf/Cnpj <span className="text-danger">*</span></label>
              <input
                type="text"
                name="cpfcnpj"
                className="form-control"
                placeholder="Digite o cpfcnpj..."
                value={cpfcnpj}
                onChange={e => setCpfCnpj(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Especialidade</label>
              <input
                type="text"
                name="especialidade"
                className="form-control"
                value={especialidade}
                onChange={e => SetEspecialidade(e.target.value)}
              >
              </input>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Descrição</label>
              <textarea
                type="text"
                name="descricao"
                maxLength={512}
                className="form-control"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                placeholder="de 0 a 512 caracteres..." />
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
            <th>Nome</th>
            <th>Cpf/Cnpj</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    )
  }

  const renderRows = () => {
    return customers.map(cust => {
      return (
        <tr key={cust.id}>
          <td>{cust.name}</td>
          <td>{cust.cpfcnpj === undefined ? '00.000.000-00' : cust.cpfcnpj}</td>
          <td>{cust.descricao}</td>
          <td>
            <button className="btn btn-search"
              style={{ backgroundColor: '#3583f6' }}
              onClick={() => search(cust)}>
              <i className="fa fa-search"></i>
            </button>

            <button className="btn btn-warning"
              onClick={() => edit(cust.id)}>
              <i className="fa fa-pencil"></i>
            </button>

          </td>
        </tr>
      )
    });
  }

  const showModal = () => {
    return (
      <>
        {showPostModal && (
          <ModalCustomer
            conteudo={detail}
            close={search}
          />
        )}
      </>
    )
  }

  return (
    <Main {...headerProps} >
      {renderForm()}
      {renderTable()}
      {showModal()}
    </Main>
  )
}
