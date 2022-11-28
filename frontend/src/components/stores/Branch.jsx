import { Component } from "react";
import axios from "axios";

const baseUrlStore = 'http://localhost:3001/store';

const initialState = {
    store: { Id: 0 },
    listStore: []
}

export default class Branch extends Component {
    state = { ...initialState };

    componentWillMount() {
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

    updateField(event) {
        const store = { ...this.state.address };
        store[event.target.name] = parseInt(event.target.value, 10) >= 0 ? parseInt(event.target.value, 10) : event.target.value
        this.setState({ store })
    }

    renderForm() {
        return (
            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Unidade</label>
                    <select
                        className="form-control"
                        type="option"
                        name="id"
                        value={this.state.store.id}
                        onChange={e => this.updateField(e)}
                    >
                        {this.state.listStore.map(store => {
                            return (
                                <option
                                    key={store.id}
                                    value={store.id}>
                                    {store.nameStore}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
        )
    }

    render() {
        return (
            this.renderForm()
        )
    }
}