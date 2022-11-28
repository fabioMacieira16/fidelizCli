import { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Main from '../template/Main';
import Stores from './Stores';
import Hours from './Hours';
import '../stores/tabStore.css'
import Address from './Address';

const headerProps = {
    icon: `tag`,
    title: 'Minhas Lojas',
    subtitle: 'Cadastro de lojas'
}

const initialState = {
    step: 'STORES',
}

export default class TabStore extends Component {

    state = { ...initialState };

    setStep(step) {
        this.setState({ step: step })
    }

    renderTabContent() {
        const step = {
            STORES: 'STORES',
            HOURS: 'HOURS',
            ANDRESS: 'ANDRESS',
            PAYMENT: "PAIMENT",
            IMAGE: "IMAGE"
        }

        return (
            <div className='menu-tabContent'>
                <Nav tabs style={{cursor: 'pointer'}}>
                    <NavItem>
                        <NavLink
                            className={this.state.step === 'STORES' ? 'active' : ''}
                            onClick={() => { this.setStep('STORES') }}
                            active={''}
                        >
                            {'Loja'}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={this.state.step === 'ANDRESS' ? 'active' : ''}
                            onClick={() => { this.setStep('ANDRESS') }}
                        >
                            {'Endreço'}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={this.state.step === 'HOURS' ? 'active' : ''}
                            onClick={() => { this.setStep('HOURS') }}
                        >
                            {'Horários'}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={this.state.step === 'IMAGE' ? 'active' : ''}
                            onClick={() => { this.setStep('IMAGE') }}
                        >
                            {'Imagem'}
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.step}>
                    <TabPane tabId={'STORES'}>
                        <p>{''}</p>
                        <Stores />
                    </TabPane>

                    <TabPane tabId={'ANDRESS'}>
                        <p>{''}</p>
                        <Address />
                    </TabPane>

                    <TabPane tabId={'HOURS'}>
                        <p>{''}</p>
                          <Hours />  
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