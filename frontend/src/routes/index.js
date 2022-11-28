import { Switch } from 'react-router-dom';
import Route from './Route'

import SignIn from '../components/template/SignIn';

import Home from '../components/home/Home';
import User from '../components/user/User';
import Cardapio from '../components/cardapio/Cardapio';
import TabStore from '../components/stores/TabStore';
import Customers from '../components/customer/Customers';

export default function Routes() {
    return (
        <Switch>
            <Route exact path='/' component={SignIn} />
            <Route exact path='/home' component={Home} isPrivate />
            <Route exact path='/users' component={User} isPrivate />
            <Route exact path='/cardapios' component={Cardapio} isPrivate />
            <Route exact path='/tabStore' component={TabStore} isprivate />
            <Route exact path='/customer' component={Customers} isPrivate />
        </Switch>
    )
} 