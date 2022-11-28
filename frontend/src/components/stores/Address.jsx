import { Component } from "react";
import axios from "axios";
import Main from "../template/Main"
import { IsCepValid } from '../../main/Util';
import Branch from "./Branch";

const headerProps = {
    icon: `tag`,
    title: 'Endereço das Lojas',
    // subtitle: 'Endereço das lojas'
}

const baseUrl = 'http://localhost:3001/address';
const baseUrlStore = 'http://localhost:3001/store';

const initialState = {
    address: { stroreId: '', cep: '', logradouro: '', numero: '', localidade: '', complemento: '', bairro: '', uf: '' },
    qtdError: '',
    store: { Id: 0 },
    list: [],
    listStore: []
}
export default class Address extends Component {
    state = { ...initialState };

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data });
        });

        axios(baseUrlStore).then(resp => {
            this.setState({
                listStore: resp.data,
                store: {
                    ...this.state.store,
                    Id: resp.data[0].Id
                }
            });
        });
    }

    clear() {
        this.setState({ address: initialState.address });
    }

    save() {
        debugger;
        const address = this.state.address;
        const method = address.id ? 'put' : 'post';
        const url = address.id ? `${baseUrl}/${address.id}` : `${baseUrl}`;

        axios[method](url, address)
            .then(resp => {
                const list = this.getUpdatedList(resp.data);
                this.setState({
                    address: {
                        cep: this.state.list[0].cep,
                        logradouro: this.state.list[0].logradouro,
                        numero: this.state.list[0].numero,
                        complemento: this.state.list[0].complemento,
                        localidade: this.state.list[0].localidade,
                        uf: this.state.list[0].uf,
                        pais: this.state.list[0].pais,
                    },
                    list,
                });
                this.clear()
            });
    }

    getUpdatedList(address, add = true) {
        const list = this.state.list.filter(s => s.id !== address.id)
        if (add) list.unshift(address)
        return list;
    }

    updateField(event) {
        const address = { ...this.state.address };
        address[event.target.name] = parseInt(event.target.value, 10) >= 0 ? parseInt(event.target.value, 10) : event.target.value
        this.setState({ address })
    }

    async getCep(e) {
        try {
            const cep = e.target.value.replace(/\D/g, '');
            let dados = axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then((res) => {
                    let dados = res.data;
                    this.setState({ address: dados })
                });
        } catch (error) {
            console.error(error);
        }
    }

    load(address) {
        this.setState({ address });
    }

    remove(address) {
        axios.delete(`${baseUrl}/${address.id}`)
            .then(resp => {
                const list = this.getUpdatedList(address, false)
                this.setState({ list });
            })
    }

    nameStore(stroreId) {
        return this.state.listStore.filter(s => s.id == stroreId).map(x => x.nameStore);
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <Branch />
                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label className="control-label">CEP <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                name="cep"
                                placeholder="Digite seu cep"
                                className="form-control"
                                value={IsCepValid(this.state.address.cep)}
                                onChange={e => this.updateField(e)}
                                onBlur={e => this.getCep(e)}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label className="control-label">Logradouro <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                name="logradouro"
                                className="form-control"
                                value={this.state.address.logradouro}
                                onChange={e => this.updateField(e)}
                            />
                            <label className='text-danger'>{this.state.qtdError}</label>
                        </div>
                    </div>

                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label className="control-label">Número <span className="text-danger">*</span></label>
                            <input
                                type="number"
                                className="form-control"
                                name="numero"
                                value={this.state.address.numero}
                                onChange={e => this.updateField(e)}
                                required />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label className="control-label">Complemento <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                name="complemento"
                                className="form-control"
                                value={this.state.address.complemento}
                                onChange={e => this.updateField(e)}
                            />
                            <label className='text-danger'>{this.state.qtdError}</label>
                        </div>
                    </div>

                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label className="control-label">Bairro <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                name="bairro"
                                value={this.state.address.bairro}
                                onChange={e => this.updateField(e)}
                                required />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label className="control-label">Cidade <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                name="localidade"
                                className="form-control"
                                value={this.state.address.localidade}
                                onChange={e => this.updateField(e)}
                            />
                            <label className='text-danger'>{this.state.qtdError}</label>
                        </div>
                    </div>

                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label className="control-label">UF <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                name="uf"
                                value={this.state.address.uf}
                                onChange={e => this.updateField(e)}
                                required />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label className="control-label">País <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                name="pais"
                                className="form-control"
                                value={this.state.address.pais = "Brasil"}
                                onChange={e => this.updateField(e)}
                            />
                            <label className='text-danger'>{this.state.qtdError}</label>
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
                        <th>Unidade</th>
                        <th>Logradouro</th>
                        <th>Bairro</th>
                        <th>Complemento</th>
                        <th>Cidade</th>
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
        return this.state.list.map(address => {
            return (
                <tr key={address.id}>
                    <td>{address.id}</td>
                    <td>{this.nameStore(address.stroreId)}</td>
                    <td>{address.logradouro}</td>
                    <td>{address.bairro}</td>
                    <td>{address.complemento}</td>
                    <td>{address.localidade}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(address)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(address)}>
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