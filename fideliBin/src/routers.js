import React from 'react';

import { Switch, Route, } from 'react-router-dom';

import Awards from './pages/Awards';
import Login from './pages/Login';
import Register from './pages/Register';
import ByFidelizarMais from './pages/ByFidelizarMais';
import Challenge from './pages/Challenge';
import Extract from './pages/Extract';
import HowItWorks from './pages/HowItWorks';
import Regulation from './pages/Regulation';
import Search from './pages/Search';
import TermsUse from './pages/TermsUse';

//todo: retirar o item ele é componet -incluido aqui para fazer o teste  na tela

const Routers = () => (
  <Switch>
    <Route path="/" component={Awards} exact />
    <Route path="/login" component={Login} />
    <Route path="/Register" component={Register} />
    <Route path="/extrato" component={Extract} />
    <Route path="/busca" component={Search} />
    <Route path="/desafios" component={Challenge} />
    <Route path="/comofunciona" component={HowItWorks} />
    <Route path="/regulamento" component={Regulation} />
    <Route path="/termosdeuso" component={TermsUse} />
    <Route path="/byfidelizarmais" component={ByFidelizarMais} />
    <Route component={() => <div>Page 404!</div>} />
  </Switch>
);

export default Routers;