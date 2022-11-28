import { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Stores from './Stores';
import Main from '../template/Main';
import { step } from "../../main/Util";

const headerProps = {
    icon: `tag`,
    title: 'Minhas Lojas',
    subtitle: 'Cadastro de lojas'
}

const initialState = {
    step: 'STORES',
}

export default class MenuStore extends Component {
    
    state = { ...initialState };

    renderTabContent() {
        
        const step = {
            STORES: 'STORES',
            ADDRESS: 'ADDRESS',
            PAGAMENTO: "PAGAMENTO"
        }

        return (
            <div className='menu-tabContent'>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={this.state.step === 'STORES' ? 'active' : ''}
                            // onClick={() => { setMotivo(STORES) }}
                            active={''}
                        >
                            {'Loja'}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={this.state.step === 'ADDRESS' ? 'active' : ''}
                        // onClick={() => { setMotivo(ENDERECO) }}
                        >
                            {'Endereço'}
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={''}>
                    <TabPane tabId={1}>
                        <p>{''}</p>
                        {/* <Stores /> */}
                    </TabPane>

                    <TabPane tabId={2}>
                        <p>{''}</p>
                        {/* <OcorrenciaEndereco
                    motivo={allValues.motivo}
                    endereco={enderecoEntrega}
                    handleChange={handleChange}
                    sent={sent} /> */}
                    </TabPane>
                </TabContent>
            </div>
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderTabContent()}
            </Main>
        )
    }
}