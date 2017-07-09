import React, {Component, PropTypes} from 'react';

export default class SubscriptionUpgradeCard extends Component {
	static propTypes = {
		showStatus: PropTypes.bool,
		description: PropTypes.object.isRequired,
		showCancelButton: PropTypes.bool
	};

	render() {
		const {showStatus, description, showCancelButton} = this.props;

		return (
			<div className="subscription-upgrade-card">
				{showStatus && (
					<div className="subscription-status">Subscribed</div>
				)}
				<div className="subscription-value">$15.00 USD/Month</div>
				<div className="subscription-description">
					{description}
				</div>
				<div className="subscription-upgrade-button-wrapper">
					<button className="btn btn-lg btn-primary btn-rounded btn-subscribe">Upgrade</button>
					{showCancelButton && (
						<div>
							<button className="btn btn-link btn-subscribe-cancel">Cancel</button>
						</div>
					)}
				</div>
			</div>
		);
	}
}
