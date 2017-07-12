import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Menubar} from '../components/index';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {setActiveLink, unsetActiveLink} from '../redux/modules/helpfulLinksStore';
import {connect} from "react-redux";

@connect(
	state => ({
		activeHelpfulLink: state.helpfulLinksStore.activeHelpfulLink
	}),
	{setActiveLink, unsetActiveLink}
)
export default class Help extends Component {

	componentDidMount() {
		this.props.setActiveLink(this.props.params.slug);
	}

	componentWillUnmount() {
		this.props.unsetActiveLink();
	}

	componentWillReceiveProps(nextProps) {
		this.props.setActiveLink(nextProps.params.slug);
	}

	createMarkup = (html) => {
		return {__html: html};
	};

	render() {
		const {activeHelpfulLink} = this.props;

		return (
			<ReactCSSTransitionGroup
				transitionName="react-anime"
				transitionAppear={true}
				transitionAppearTimeout={5000}
				transitionEnter={true}
				transitionEnterTimeout={500}
				transitionLeave={true}
				transitionLeaveTimeout={500}
			>
				<div className="help-page-wrapper bottom-padding">
					<Helmet title="Helpful Links"/>

					<Menubar
						title="Helpful Links"
						className="gradient-blue text-white"
						backButton={true}
					/>

					<div className="container">
						<div className="row">
							<div className="col-xs-12">
								{activeHelpfulLink ? (
									<div>
										<h2 className="text-center" dangerouslySetInnerHTML={this.createMarkup(activeHelpfulLink.title)}/>
										<hr/>
										<div dangerouslySetInnerHTML={this.createMarkup(activeHelpfulLink.content)}/>
									</div>
								) : undefined}
							</div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}