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
		backButton: PropTypes.bool,
		showHome: PropTypes.bool
	};

	render() {
		const {user, title, leftSideContent, rightSideContent, className, backButton, showHome} = this.props;

		let leftSideConditionalContent = <div/>;

		if (backButton) {
			leftSideConditionalContent = <a href="javascript:history.back()">
				<span className="icon-arrow-left back-icon"/>
				<span className="back-text">Back</span>
			</a>;
		} else{
			leftSideConditionalContent = leftSideContent;
		}

		let rightSideConditionalContent = <div/>;
		if (!user) {
			rightSideConditionalContent = <Link to="/login">Login</Link>;
		} else if(showHome){
			rightSideConditionalContent = <Link to="/">
				<span className="mobile-hide">Home</span>
				<span className="icon-nav-home"/>
			</Link>
		} else {
			rightSideConditionalContent = rightSideContent;
		}

		return (
			<div className={`menu-bar ${className}`}>
				<div className="container-fluid">
					<div className="row menu-bar-headings">
						<div className="col-xs-2 col-sm-3 menu-bar-left-side-content">
							{leftSideConditionalContent}
						</div>
						<div className="col-xs-8 col-sm-6 menu-bar-title">{title}</div>
						<div className="col-xs-2 col-sm-3 menu-bar-right-side-content">{rightSideConditionalContent}</div>
					</div>
					{this.props.children}
				</div>
			</div>
		);
	}
}