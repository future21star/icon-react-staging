import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from "react-redux";

@connect(
	state => ({
		subscription: state.authStore.user.subscription
	})
)
export default class Welcome extends Component {

	createMarkup = (html) => {
		return {__html: html};
	};

	render() {
		const {subscription} = this.props;

		// displaying all subscription info in console for @Eli
		console.log("for @Eli:", subscription);

		let output = '<ul>';
		for (let property in subscription) {
			output += '<li>' + property + ': ' + subscription[property] + '</li>';
		}
		output += '<ul>';

		return (
			<div className="bottom-padding">
				<Helmet title="Welcome"/>
				<div className="container">
					<h1>Welcome Page</h1>

					<div dangerouslySetInnerHTML={this.createMarkup(output)}/>

					<strong>See more at browser console</strong>
				</div>
			</div>
		);
	}
}
