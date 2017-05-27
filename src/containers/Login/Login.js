import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import {Logo, FacebookButton, ShowPasswordInput} from '../../components';
import {Link} from "react-router";

@connect(
	state => ({user: state.auth.user}),
	authActions)
export default class Login extends Component {
	static propTypes = {
		user: PropTypes.object,
		login: PropTypes.func,
		logout: PropTypes.func
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const input = this.refs.email;
		this.props.login(input.value);
		input.value = '';
	};

	render() {
		const {user, logout} = this.props;

		return (
			<div>
				<Helmet title="Log In"/>

				<div className="container">
					<div className="row">
						<div className="col-xs-8 col-xs-offset-2">
							<Logo/>
						</div>

						<div className="col-xs-12">
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

								<ShowPasswordInput/>

								<div className="form-submit-btn-wrapper">
									<button className="btn btn-danger btn-block btn-lg" type="submit">Log In</button>
								</div>
							</form>

							<div className="login-page--forgot-password-link-wrapper">
								<Link to="forgot-password">Forgot?</Link>
							</div>

							<div className="login-page--register-link-wrapper">
								Don't have an account? <Link to="register">Create one</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
