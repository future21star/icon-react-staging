import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import moment from "moment";
import ReactAudioPlayer from 'react-audio-player';
import ReactDisqusThread from 'react-disqus-thread';

@connect(
	state => ({
		browser: state.browser,
		activeItemType: state.feedStore.activeItemType,
		activeItem: state.feedStore.activeItem
	})
)

export default class FeedPostSingle extends Component {
	static propTypes = {};

	createMarkup = (html) => {
		return {__html: html};
	};

	render() {
		const {browser, activeItemType, activeItem} = this.props;
		const defaultImage = require('../../../static/logo.png');

		return (
			activeItem ? (
				<div className="feed-content-wrapper">
					<div className="feed-featured-post">
						<div className="feed-featured-post-image">
							{activeItemType === 'podcast' && <img width="100%" src={activeItem.image || defaultImage}/>}
							{activeItemType === 'mentality' && activeItem.is_blog &&
							<img width="100%" src={activeItem.image || defaultImage}/>}
							{activeItemType === 'mentality' && activeItem.is_video &&
							<div className="type-video-iframe" dangerouslySetInnerHTML={this.createMarkup(activeItem.video)}/>}
						</div>

						<div className={`${browser.is.mobile ? 'container' : ''}`}>
							<h2 className="feed-featured-post-title" dangerouslySetInnerHTML={this.createMarkup(activeItem.title)}/>
							<div className="feed-featured-post-date">Posted {moment(activeItem.date).format('DD.MM.YYYY')}</div>
							<div className="feed-featured-post-content">
								{ (activeItemType === 'podcast' && activeItem.audio) && (
									<ReactAudioPlayer
										src={activeItem.audio}
										controls
										style={{'width': '100%'}}
									/>
								)}
								{activeItem.description}
							</div>

							<ReactDisqusThread
								shortname="example"
								identifier="something-unique-12345"
								title="Example Thread"
								url="http://www.example.com/example-thread"
								category_id="123456"/>
						</div>
					</div>
				</div>
			) : <div/>
		);
	}

}
