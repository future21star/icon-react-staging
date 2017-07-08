import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class SuccessMessage extends Component {
	static propTypes = {
		success: PropTypes.object
	};

	render() {
		const {success} = this.props;

		return (
			<div>
				{success ? (
					<ReactCSSTransitionGroup
						transitionName="react-anime"
						transitionAppear={true}
						transitionAppearTimeout={5000}
						transitionEnter={true}
						transitionEnterTimeout={500}
						transitionLeave={true}
						transitionLeaveTimeout={500}
					>
						<div className="alert alert-success text-center">
							{success.message}
						</div>
					</ReactCSSTransitionGroup>
				) : undefined}
			</div>
		);
	}
}
