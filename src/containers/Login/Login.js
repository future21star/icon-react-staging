import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {login} from '../../redux/modules/auth';
import {Loader, Logo, FacebookButton, ShowPasswordInput, ErrorMessage, SuccessMessage} from '../../components';
import {Link} from "react-router";

@connect(
	state => ({
		auth: state.auth
	}),
	{login})
export default class Login extends Component {
	static propTypes = {
		auth: PropTypes.object,
		login: PropTypes.func,
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const {email, password} = this.refs;
		this.props.login(email.value, password.getValue());
	};

	render() {
		return (
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
		);
	}

	renderLoginForm() {
		const {auth} = this.props;

		return (
			<div>
				<ErrorMessage error={auth.error}/>
				<SuccessMessage success={auth.success}/>
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

					{auth.loading ? <Loader/> : undefined}

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
