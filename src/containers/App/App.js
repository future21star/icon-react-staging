import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {isLoaded as isInfoLoaded, load as loadInfo} from 'redux/modules/info';
import {isLoaded as isAuthLoaded, load as loadAuth, logout} from 'redux/modules/auth';
import {InfoBar} from 'components';
import {push} from 'react-router-redux';
import config from '../../config';
import {asyncConnect} from 'redux-async-connect';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isInfoLoaded(getState())) {
			promises.push(dispatch(loadInfo()));
		}
		if (!isAuthLoaded(getState())) {
			promises.push(dispatch(loadAuth()));
		}

		return Promise.all(promises);
	}
}])
@connect(
	state => ({user: state.auth.user}),
	{logout, pushState: push})
export default class App extends Component {
	static propTypes = {
		children: PropTypes.object.isRequired,
		user: PropTypes.object,
		logout: PropTypes.func.isRequired,
		pushState: PropTypes.func.isRequired
	};

	static contextTypes = {
		store: PropTypes.object.isRequired
	};

	componentWillReceiveProps(nextProps) {
		if (!this.props.user && nextProps.user) {
			// login
			//this.props.pushState('/loginSuccess');
			this.props.pushState('/');
		} else if (this.props.user && !nextProps.user) {
			// logout
			this.props.pushState('/login');
		}
	}

	handleLogout = (event) => {
		event.preventDefault();
		this.props.logout();
	};

	render() {
		const {user} = this.props;

		return (
			<div className="test">
				<Helmet {...config.app.head}/>

				{/*{user &&*/}
				{/*<button onClick={this.handleLogout} className="btn btn-block btn-lg btn-primary btn-fixed-top">*/}
				{/*Logout*/}
				{/*</button>}*/}

				{/*<div className="container">*/}
				{/*{user &&*/}
				{/*<p className='navbar-text'>Logged in as <strong>{user.name}</strong></p>}*/}
				{/*</div>*/}

				<div className="app-wrapper">
					{this.props.children}
				</div>

			</div>
		);
	}
}
