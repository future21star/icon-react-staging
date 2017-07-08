import React, {Component, PropTypes} from 'react';

export default class NoAccess extends Component {
	static propTypes = {
		title: PropTypes.string,
		description: PropTypes.object,
		logo: PropTypes.bool
	};

	render() {
		const {title, description, logo} = this.props;
		return (
			<div className="no-access-wrapper">
				<h3 className="title">{title || 'No Access'}</h3>
				{logo && (
					<div className="row">
						<div className="col-xs-8 col-xs-offset-2">
							{this.renderLogo()}
						</div>
					</div>
				)}
				<div className="description">{description || 'You do not have access to view this section.'}</div>
			</div>
		);
	}

	renderLogo() {
		const logo = require('../../../static/logo.svg');
		return (
			<div className="logo-wrapper">
				<img src={logo} width="100%"/>
			</div>
		);
	}
}
