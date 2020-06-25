import React ,{Component} from 'react';
import ReactDOm from 'react-dom';
///yg dibawah urang udah install lewat cmd urang lupa kata katanya pokoknya ada react-router-dom
///terus kalo perlu dipanggil kaya dibawah
import { BrowserRouter, Route, Switch } from 'react-router-dom'

///ini cuman manggil tampilan lain/class
import Header from './Header'
import ArticleIndex from './ArticleIndex'
import ArticleCreate from './ArticleCreate'
import ArticleShow from './ArticleShow'
import ArticleEdit from './ArticleEdit'

export default class App extends Component{
	render(){
		return(
            ///ini buat bikin apa ya namanya urang lupa pokoknya bikin route tapi di 1 halaman
            <BrowserRouter>
                <div>
                ///ini manggil class
                    <Header />
                ///kalo switch urang lupa
                    <Switch>
                ///route ya route    
                    <Route exact path='/' component={ArticleIndex}/>
                    <Route exact path='/create' component={ArticleCreate} />
                    <Route path='/article/edit/:id' component={ArticleEdit} />
                    <Route path='/article/:id' component={ArticleShow} />
                    </Switch>
                </div>
            </BrowserRouter>
		);
	}
}

///ini buat manggil id tadi <App /> ini nama class
ReactDOm.render(<App />,document.getElementById('app'));