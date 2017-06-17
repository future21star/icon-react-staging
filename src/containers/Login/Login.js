import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {login} from '../../redux/modules/loginStore';
import {Loader, Logo, FacebookButton, ShowPasswordInput, ErrorMessage, SuccessMessage} from '../../components';
import {Link} from "react-router";

@connect(
	state => ({
		loginStore: state.loginStore
	}),
	{login}
)

export default class Login extends Component {
	static propTypes = {
		loginStore: PropTypes.object,
		login: PropTypes.func,
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const {email, password} = this.refs;
		this.props.login(email.value, password.getValue());
	};

	render() {
		return (
			<ReactCSSTransitionGroup
				transitionName="react-anime"
				transitionAppear = {true}
				transitionAppearTimeout = {5000}
				transitionEnter = {true}
				transitionEnterTimeout={500}
				transitionLeave = {true}
				transitionLeaveTimeout={500}
			>
				<div>
					<Helmet title="Log In"/>

					<div className="container">
						<div className="row">
							<div className="col-xs-8 col-xs-offset-2">
								<Logo/>
							</div>

							<div className="col-xs-12">
								{this.renderLoginForm()}
							</div>
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
					<div className="form-group">
						<FacebookButton/>
					</div>
					<div className="form-group">
						<div className="input-group">
							<div className="input-group-addon">
								<span className="icon-email"/>
							</div>
							<input type="email" ref="email" className="form-control" placeholder="Your Email"/>
						</div>
					</div>

					<ShowPasswordInput ref="password"/>

					<div className="form-submit-btn-wrapper">
						<button className="btn btn-danger btn-block btn-lg" type="submit">Log In</button>
					</div>

					{loginStore.loading ? <Loader/> : undefined}

				</form>
				<div className="login-page--forgot-password-link-wrapper">
					<Link to="/">Forgot?</Link>
				</div>

				<div className="login-page--register-link-wrapper">
					Don't have an account? <Link to="/">Create one</Link>
				</div>
			</div>
		);
	}
}
