import React, {Component, PropTypes} from 'react';
import './Menubar.scss';

export default class MenubarTransparent extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		leftSideContent: PropTypes.object,
		rightSideContent: PropTypes.object,
		isWhite: PropTypes.bool,
	};

	render() {
		const {title, leftSideContent, rightSideContent, isWhite} = this.props;

		var containerClasses = "menu-bar menu-bar-transparent " + (isWhite ? 'menu-color-white' : '' );

		return (
			<div className={containerClasses}>
				<div className="container-fluid">
					<div className="row menu-bar-headings">
						<div className="col-xs-3 menu-bar-left-side-content">{leftSideContent}</div>
						<div className="col-xs-6 menu-bar-title">{title}</div>
						<div className="col-xs-3 menu-bar-right-side-content">{rightSideContent}</div>
					</div>
				</div>
			</div>
		);
	}
}