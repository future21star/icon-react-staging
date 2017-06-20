import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './ErrorMessage.scss';

export default class ErrorMessage extends Component {
	static propTypes = {
		error: PropTypes.object
	};

	render() {
		const {error} = this.props;

		return (

			<div>
				{error ? (
					<ReactCSSTransitionGroup
						transitionName="react-anime"
						transitionAppear={true}
						transitionAppearTimeout={5000}
						transitionEnter={true}
						transitionEnterTimeout={500}
						transitionLeave={true}
						transitionLeaveTimeout={500}
					>
						<div className="alert alert-danger">
							{error.message}
						</div>
					</ReactCSSTransitionGroup>
				) : undefined}
			</div>
		);
	}
}
