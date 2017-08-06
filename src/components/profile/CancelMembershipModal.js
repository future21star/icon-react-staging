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
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" onClick={onClose}>&times;</button>
								<h4 className="modal-title">Cancel membership?</h4>
							</div>
							<div className="modal-body">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum enim incidunt nobis odio placeat?
								Commodi corporis dolores ea earum facere in ipsa libero pariatur possimus, praesentium provident totam
								ullam, voluptatem!
								<br/>
								<br/>

								{/*yes, it supports grid*/}
								<div className="row">
									<div className="col-xs-6 text-justify">
										<img className="img-rounded" width="100%" src="http://s2.dmcdn.net/Ub1O8/1280x720-mCQ.jpg" alt="How can you?"/>
									</div>
									<div className="col-xs-6 text-justify">
										<form action={formActionUrl} target="_blank" method="post">
											<input type="hidden" name="jwt_token" value={jwtToken}/>
											<input type="hidden" name="wp_id" value={wpUserId}/>
											<input type="hidden" name="redirect_url" value={redirectUrl}/>
											<input type="hidden" name="wp_username" value={username}/>
											<input type="hidden" name="discount" value={true}/>

											<button type="submit" className="btn btn-lg btn-danger">Cancel</button>
										</form>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default" onClick={onClose}>Close</button>
							</div>
						</div>
					</div>
				</div>
				{isShown ? <div className="modal-backdrop fade in"/> : undefined}
			</div>
		);
	}
}
