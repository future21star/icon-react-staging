import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router";

@connect(
	state => ({
		user: state.authStore.user
	})
)

export default class Menubar extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		leftSideContent: PropTypes.object,
		rightSideContent: PropTypes.object,
		className: PropTypes.string,
		backButton: PropTypes.bool
	};

	render() {
		const {user, title, leftSideContent, rightSideContent, className, backButton} = this.props;

		let leftSideConditionalContent = <div/>;
		if (!user) {
			leftSideConditionalContent = <Link to="/login">Login</Link>;
		}
		else if (backButton) {
			leftSideConditionalContent = <a href="javascript:history.back()">
				<span className="icon-arrow-left back-icon"/>
				<span className="back-text">Back</span>
			</a>;
		} else {
			leftSideConditionalContent = leftSideContent;
		}

		return (
			<div className={`menu-bar ${className}`}>
				<div className="container-fluid">
					<div className="row menu-bar-headings">
						<div className="col-xs-3 menu-bar-left-side-content">
							{leftSideConditionalContent}
						</div>
						<div className="col-xs-6 menu-bar-title">{title}</div>
						<div className="col-xs-3 menu-bar-right-side-content">{rightSideContent}</div>
					</div>
					{this.props.children}
				</div>
			</div>
		);
	}
}