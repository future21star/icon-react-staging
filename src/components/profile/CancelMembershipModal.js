import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";

@connect(
	state => ({
		subscription: state.authStore.user.subscription,
		jwtToken: state.authStore.user.jwtToken,
		wpUserId: state.authStore.user.wpUserId,
		username: state.authStore.user.username,
		routing: state.routing
	}),
	{}
)

export default class CancelMembershipModal extends Component {
	static propTypes = {
		isShown: PropTypes.bool.isRequired,
		onClose: PropTypes.func.isRequired
	};

	render() {

		const {subscription, jwtToken, wpUserId, username, isShown, onClose, routing} = this.props;
		const formActionUrl = 'http://54.148.236.111/register/upgrade';

		let redirectUrl = null;
		if (process.env.NODE_ENV !== 'production') {
			redirectUrl = 'http://localhost:3000' + routing.locationBeforeTransitions.pathname;
		} else {
			redirectUrl = 'http://54.148.236.111' + routing.locationBeforeTransitions.pathname;
		}

		return (
			<div>
				<div className={isShown ? "modal show" : "modal"}>
					<div className="modal-dialog modal-lg">
						<div className="modal-content container-small">
							<div className="modal-header">
								<button type="button" className="close" onClick={onClose}>&times;</button>
								<h2 className="modal-title text-center">Before You Go:</h2>
							</div>
							<div className="modal-body">
								<p>Our goal at Icon Athlete is to help everyone acheive their fitness goals</p>
								<p>Give us a little longer, take a discounted month on us. We are sure you won't regret it!</p>
								<h4>1 Month: 20% off</h4>
			
								<div className="row text-center">
									<div className="col-xs-12">
										<a href="http://54.148.236.111/register/upgrade" target="_blank" className="btn btn-lg btn-icon btn-icon-lg btn-icon-icon"><span className="icon-update-sub" />I Want The Discount!</a>
									</div>
									<div className="col-xs-12">
										<form action={formActionUrl} target="_blank" method="post">
											<input type="hidden" name="jwt_token" value={jwtToken}/>
											<input type="hidden" name="wp_id" value={wpUserId}/>
											<input type="hidden" name="redirect_url" value={redirectUrl}/>
											<input type="hidden" name="wp_username" value={username}/>
											<input type="hidden" name="discount" value={true}/>
											<button type="submit" className="btn btn-cancel">No, I do not want to take advantage of this awesome discount.</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{isShown ? <div className="modal-backdrop fade in"/> : undefined}
			</div>
		);
	}
}
