import React, { Component, useState } from "react"
import axios from "axios"
import Main from "../template/Main"
import { telephoneMask } from "../../main/Util"

const headerProps = {
    icon: `tag`,
    title: 'Minhas Lojas',
    // subtitle: 'Cadastro de lojas'
}

const baseUrl = 'http://localhost:3001/store';
const baseUrlSpecialty = 'http://localhost:3001/specialty';

const initialState = {
    store: { nameStore: '', phone: '', specialtyId: 0, description: '', },
    specialty: { Id: 0, code: '', name: '' },
    qtdError: '',
    list: [],
    listspecialty: [],
    numberFormat: '',
}
export default class Store extends Component {
    state = { ...initialState };
 
    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data });
        });

        axios(baseUrlSpecialty).then(resp => {
            this.setState({
                listspecialty: resp.data,
                specialty: {
                    ...this.state.store,
                    Id: resp.data[0].Id
                }
            });
        });
    }

    clear() {
        this.setState({ store: initialState.store });
    }

    save() {
        const store = this.state.store;
        const method = store.id ? 'put' : 'post';
        const url = store.id ? `${baseUrl}/${store.id}` : `${baseUrl}`;

        axios[method](url, store)
            .then(resp => {
                const list = this.getUpdatedList(resp.data);
                this.setState({
                    store: {
                        nameStore: this.state.list[0].nameStore,
                        phone: this.state.list[0].phone,
                        specialtyId: this.state.list[0].specialtyId,
                        description: this.state.list[0].description
                    },
                    list,
                });
                this.clear()
            });
    }

    getUpdatedList(store, add = true) {
        const list = this.state.list.filter(s => s.id !== store.id);
        if (add) list.unshift(store)
        return list;
    }

    updateField(event) {
        const store = { ...this.state.store };
        store[event.target.name] = parseInt(event.target.value, 10) >= 0 ? parseInt(event.target.value, 10) : event.target.value
        this.setState({ store });
    }

    onChangeTelephone(event) {
        const store = { ...this.state.store };
        store[event.target.name] = telephoneMask(event.target.value)
        this.setState({ store });
    }

    load(store) {
        this.setState({ store });
    }

    remove(store) {
        axios.delete(`${baseUrl}/${store.id}`)
            .then(resp => {
                const list = this.getUpdatedList(store, false)
                this.setState({ list });
            })
    }

    namespecialty(specialtyId) {
        return this.state.listspecialty.filter(c => c.Id === specialtyId).map(x => x.name);
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label className="control-label">Nome da loja <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                name="nameStore"
                                value={this.state.store.nameStore}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome de sua loja ..."
                                required />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label className="control-label">Telefone <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                placeholder="Digite o telefone dessa loja..."
                                value={this.state.store.phone}
                                onChange={e => this.onChangeTelephone(e)}
                            />
                            <label className='text-danger'>{this.state.qtdError}</label>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Especialidade</label>
                            <select
                                className="form-control"
                                type="option"
                                name="specialtyId"
                                value={this.state.store.specialtyId}
                                onChange={e => this.updateField(e)}
                            >
                                {this.state.listspecialty.map(specialty => {
                                    return (
                                        <option
                                            key={specialty.Id}
                                            value={specialty.Id}>
                                            {specialty.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Descrição</label>
                            <textarea
                                type="text"
                                maxLength={512}
                                className="form-control"
                                name="description"
                                value={this.state.store.description}
                                onChange={e => this.updateField(e)}
                                placeholder="de 0 a 512 caracteres..." />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button
                            className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome da loja</th>
                        <th>Telefone</th>
                        <th>Especialidade</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(store => {
            return (
                <tr key={store.id}>
                    <td>{store.id}</td>
                    <td>{store.nameStore}</td>
                    <td>{store.phone}</td>
                    <td> {this.namespecialty(store.specialtyId)}</td>
                    <td>{store.description}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(store)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(store)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}