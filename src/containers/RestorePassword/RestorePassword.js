import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {JumbotronWhite, MenubarWhite, ShowPasswordInput} from '../../components';
import {Link, withRouter} from "react-router";
import {connect} from "react-redux";
import {restorePassword} from "../../redux/modules/restorePasswordStore";

@connect(
	state => ({
		restorePasswordStore: state.restorePasswordStore,
		routing: state.routing
	}),
	{restorePassword}
)
export default class RestorePassword extends Component {

	static contextTypes = {
		router: PropTypes.object.isRequired
	}

	render() {
		console.log(this.props.params.token);
		const description = (
			<div>
				Write a new password that you will <br/> remember for your account.
			</div>
		);

		const rightSideContent = (
			<Link to="/login" className="text-danger">Cancel</Link>
		);
		return (
			<div>
				<Helmet title="Restore Password"/>

				<MenubarWhite title="Restore" rightSideContent={rightSideContent}/>

				<div className="container">

					<JumbotronWhite
						title="Restore password"
						description={description}
					/>

					<div className="row">
						<div className="col-xs-12">
							<form className="restore-password-page--restore-password-form">

								<ShowPasswordInput
									placeholder="New Password"
								/>
								<ShowPasswordInput
									placeholder="Re-Enter Password"
								/>

								<div className="form-submit-btn-wrapper">
									<button className="btn btn-danger btn-block btn-lg" type="submit">Restore</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
