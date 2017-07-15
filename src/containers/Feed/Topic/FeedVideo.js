import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {connect} from "react-redux";
import {MobileFeedFilters} from '../../../components'

@connect(
	state => ({
		browser: state.browser
	})
)

export default class FeedVideo extends Component {
	render() {
		const {browser} = this.props;

		return (
			<div>
				<Helmet title="Feed: Video"/>

				<h2 className="text-center">Videos</h2>

				{/*<FeedSeeAllVideosBtn/>*/}
				{browser.is.mobile && <MobileFeedFilters/>}
			</div>
		);
	}
}
