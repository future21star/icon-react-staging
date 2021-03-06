import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {login,showWelcomeAfterLogin} from '../redux/modules/loginStore';
import {FacebookButton, ShowPasswordInput, ErrorMessage, SuccessMessage} from '../components/index';

@connect(
	state => ({
		loginStore: state.loginStore
	}),
	{login, showWelcomeAfterLogin}
)

export default class Login extends Component {
	static propTypes = {
		loginStore: PropTypes.object,
		login: PropTypes.func,
	};

	componentDidMount() {
		if(this.props.location.query.email) {
			this.refs.email.value = this.props.location.query.email;
			this.props.showWelcomeAfterLogin();
		}
			
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const {email, password} = this.refs;
		this.props.login(email.value, password.getValue());
	};

	render() {

		const logoImage = require('../../static/logo.svg');

		return (
			<ReactCSSTransitionGroup
				transitionName="react-anime"
				transitionAppear={true}
				transitionAppearTimeout={5000}
				transitionEnter={true}
				transitionEnterTimeout={500}
				transitionLeave={true}
				transitionLeaveTimeout={500}
			>
				<div>
					<Helmet title="Log In"/>
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="login-container">
									<div className="logo-wrapper">
										<img src={logoImage} width="100%"/>
									</div>
									{this.renderLoginForm()}
								</div>
							</div>
							<div className="col-md-6 hidden-xs hidden-sm login-bg"></div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderLoginForm() {
		const {loginStore} = this.props;

		return (
			<div>
				<ErrorMessage error={loginStore.error}/>
				<SuccessMessage success={loginStore.success}/>
				<form className="login-page--login-form" onSubmit={this.handleSubmit}>
					<div className="form-group block input-effect">
						<div className="input-group">
							<input type="email" ref="email" className="form-control" placeholder="Email"/>
							<div className="input-group-addon">
								<span className="icon-email"/>
							</div>
							<span className="underline"/>
						</div>

					</div>

					<ShowPasswordInput ref="password"/>

					<div className="form-submit-btn-wrapper">
						<button className="btn gradient-red btn-block btn-lg" type="submit">Log In</button>
					</div>

				</form>
				<div className="login-page--forgot-password-link-wrapper">
					<a href="https://iconathlete.com/wp-login.php?action=lostpassword" target="_blank">Forgot?</a>
				</div>

				<div className="login-page--register-link-wrapper">
					Don't have an account? <a href="https://iconathlete.com/register">Create one</a>
				</div>
			</div>
		);
	}
}
