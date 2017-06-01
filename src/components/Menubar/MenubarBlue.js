import React, {Component, PropTypes} from 'react';
import './Menubar.scss';

export default class MenubarBlue extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		leftSideContent: PropTypes.object,
		rightSideContent: PropTypes.object
	};

	render() {
		const {title, leftSideContent, rightSideContent} = this.props;
		return (
			<div className="menu-bar menu-bar-blue">
				<div className="container">
					<div className="row">
						<div className="col-xs-3 menu-bar-left-side-content">{leftSideContent}</div>
						<div className="col-xs-6 menu-bar-title">{title}</div>
						<div className="col-xs-3 menu-bar-right-side-content">{rightSideContent}</div>
					</div>
				</div>
			</div>
		);
	}
}
