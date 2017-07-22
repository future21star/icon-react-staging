import React, {Component, PropTypes} from 'react';
import {ShareButtons, ShareCounts, generateShareIcon} from 'react-share';
import {APP_URL} from '../../../api/config/app';

export default class PodcastShareButtons extends Component {
	static propTypes = {
		'podcastId': PropTypes.number.isRequired
	};

	render() {
		const {podcastId} = this.props;
		const {FacebookShareButton, TwitterShareButton} = ShareButtons;
		const FacebookIcon = generateShareIcon('facebook');
		const TwitterIcon = generateShareIcon('twitter');
		const shareUrl = APP_URL + '/feed/podcast/' + podcastId;

		return (
			<div className="podcast-share-wrapper">
				<FacebookShareButton url={shareUrl}>
					<FacebookIcon/>
				</FacebookShareButton>
				<TwitterShareButton url={shareUrl}>
					<TwitterIcon/>
				</TwitterShareButton>
			</div>
		);
	}
}
