import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {JumbotronWhite, MenubarWhite} from '../../components';
import {Link} from "react-router";

export default class ForgotPassword extends Component {

	render() {
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
							<form>
								<div className="form-group">
									<div className="input-group">
										<div className="input-group-addon">
											<span className="icon-email"/>
										</div>
										<input type="email" className="form-control" placeholder="Your Email"/>
									</div>
								</div>
								<div className="form-submit-btn-wrapper">
									<button className="btn btn-danger btn-block btn-lg" type="submit">Recover</button>
								</div>
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
