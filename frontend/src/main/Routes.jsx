import {Switch, Route, Redirect} from 'react-router';

import Home from '../components/home/Home';
import UserCrud from '../components/user/UserCrud';
import Cardapio from '../components/cardapio/Cardapio';
import MenuStore from '../components/stores/MenuStore';

export default props => 
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/users' component={UserCrud}/>
        <Route path='/cardapios' component={Cardapio}/>
        <Route path='/menuStore' component={MenuStore}/> 
        <Redirect from='*' to='/'/>
    </Switch>