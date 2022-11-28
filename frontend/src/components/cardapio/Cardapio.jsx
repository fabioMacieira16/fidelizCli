import React, { Component } from 'react';
import axios from 'axios';
import Main from '../template/Main';

const headerProps = {
    icon: 'fa-solid fa-bars',
    title: 'Cardapio',
    subtitle: 'Cadastro de Cardapio'
}

const baseUrl = 'http://localhost:3001/cardapio';

const initialState = {
    cardapio: { description: '', quantity: '', price: '', marca: '' },
    qtdError: '',
    list: []
}

export default class Cardapio extends Component {
    state = { ...initialState };

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data });
        })
    }

    clear() {
        this.setState({ cardapio: initialState.cardapio })
    }

    validationForm() {
        // const cardapio = this.state.cardapio;
        // cardapio.quantity = parseInt(cardapio.quantity, 10);
        // cardapio.price = parseInt(cardapio.price);
        return '';
    }

    save() {  
        // validationForm();
        const cardapio = this.state.cardapio;
        cardapio.quantity = parseInt(cardapio.quantity, 10);
        cardapio.price = parseInt(cardapio.price);

        const method = cardapio.id ? 'put' : 'post';
        const url = cardapio.id ? `${baseUrl}/${cardapio.id}` : `${baseUrl}`;

        axios[method](url, cardapio)
            .then(resp => {
                const list = this.getUpdatedList(resp.data);
                this.setState({ cardapio: initialState.cardapio, list })
            })
    }

    getUpdatedList(cardapio, add = true) {
        const list = this.state.list.filter(u => u.id !== cardapio.id);
        if (add) list.unshift(cardapio)
        return list;
    }

    updateField(event) {
        const cardapio = { ...this.state.cardapio };
        cardapio[event.target.name] = event.target.value;
        this.setState({ cardapio });
        this.limitQuantity();
    }

    limitQuantity() {
        if (this.state.cardapio.quantity > 1000) {
            this.setState({ qtdError: "Maximo 1000 unidades..." })
        }

        this.setState({
            fields: {
                ...this.state.cardapio,
                cardapio: {
                    qtdError: ''
                }
            }
        })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Descrição</label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                value={this.state.cardapio.description}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do produto..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Quantidade</label>
                            <input
                                type="number"
                                className="form-control"
                                name="quantity"
                                value={this.state.cardapio.quantity}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a quantidade de produtos..." />
                            <label className='text-danger'>{this.state.qtdError}</label>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Preço</label>
                            <input
                                type="number"
                                className="form-control"
                                name="price"
                                value={this.state.cardapio.price}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o preço do produto..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>marca</label>
                            <input
                                type="text"
                                className="form-control"
                                name="marca"
                                value={this.state.cardapio.marca}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a marca..." />
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

    load(cardapio) {
        this.setState({ cardapio })
    }

    remove(cardapio) {
        axios.delete(`${baseUrl}/${cardapio.id}`)
            .then(resp => {
                const list = this.getUpdatedList(cardapio, false);
                this.setState({ list });

            })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descricao</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Marca</th>
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
        return this.state.list.map(cardapio => {
            return (
                <tr key={cardapio.id}>
                    <td>{cardapio.id}</td>
                    <td>{cardapio.description}</td>
                    <td>{cardapio.quantity}</td>
                    <td>R$ {parseFloat(cardapio.price)}</td>
                    <td>{cardapio.marca}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(cardapio)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(cardapio)}>
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