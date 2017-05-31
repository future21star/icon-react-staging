import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {JumbotronWhite, MenubarWhite, ErrorMessage, SuccessMessage} from '../../components';
import {Link} from "react-router";
import {connect} from "react-redux";
import {forgotPassword} from "../../redux/modules/forgotPasswordStore";
import Loader from "../../components/Loader/Loader";

@connect(
	state => ({
		forgotPasswordStore: state.forgotPasswordStore
	}),
	{forgotPassword}
)
export default class ForgotPassword extends Component {

	handleSubmit = (event) => {
		event.preventDefault();
		const {email} = this.refs;
		this.props.forgotPassword(email.value);
	};

	render() {
		const {forgotPasswordStore} = this.props;

		const description = (
			<div>
				We will send you a recovery link <br/> to your email.
			</div>
		);

		const rightSideContent = (
			<Link to="login" className="text-danger">Cancel</Link>
		);

		return (
			<div>
				<Helmet title="Forgot Your Password?"/>

				<MenubarWhite title="Forgot" rightSideContent={rightSideContent}/>

				<div className="container">

					<JumbotronWhite
						title="Forgot your password?"
						description={description}
					/>

					<div className="row">
						<div className="col-xs-12">
							{forgotPasswordStore.error ? <ErrorMessage error={forgotPasswordStore.error}/> : undefined}
							{forgotPasswordStore.success ? <SuccessMessage success={forgotPasswordStore.success}/> : undefined}

							<form onSubmit={this.handleSubmit}>
								<div className="form-group">
									<div className="input-group">
										<div className="input-group-addon">
											<span className="icon-email"/>
										</div>
										<input type="email" ref="email" className="form-control" placeholder="Your Email"/>
									</div>
								</div>

								<div className="form-submit-btn-wrapper">
									<button className="btn btn-danger btn-block btn-lg" type="submit">Recover</button>
								</div>

								{forgotPasswordStore.loading ? <Loader/> : undefined}
							</form>

							<div className="forgot-password--check-spam-folder-wrapper">
								If you don't see the email in your inbox, <br/> please check out your spam folder.
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
