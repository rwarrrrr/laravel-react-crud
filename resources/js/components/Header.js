import React , {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component{
	render(){
		return(
	        <div className='container'>
	            <Link className='navbar-brand' to='/'>Vros</Link>
	        </div>
		);
	}
}