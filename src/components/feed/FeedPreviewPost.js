import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";
import {truncate} from "lodash";
import moment from 'moment';
import {connect} from "react-redux";

@connect(
	state => ({
		browser: state.browser
	})
)

export default class FeedPreviewPost extends Component {
	static propTypes = {
		'type': PropTypes.string.isRequired,
		'id': PropTypes.number.isRequired,
		'title': PropTypes.string.isRequired,
		'date': PropTypes.string.isRequired,
		'description': PropTypes.string.isRequired,
		'image': PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.bool
		]),
		'is_featured': PropTypes.bool,
		// belows are for type podcast
		'audio': PropTypes.string,
		// belows are for type mentality
		'is_video': PropTypes.bool,
		'is_blog': PropTypes.bool,
		'video': PropTypes.string
	};

	createMarkup = (html) => {
		return {__html: html};
	};

	render() {
		const {browser, type, title, id, date, description, image, is_featured, audio, is_blog, is_video, video} = this.props;

		const defaultImage = require('../../../static/logo.png');

		return (
			<div>
				{ is_featured ?
					<div className="feed-featured-post">
						<div className="row">
							<div className="col-xs-12 col-lg-3">
								<div className="feed-featured-post-image">
									{type === 'podcast' && <img width="100%" src={image || defaultImage}/>}
									{type === 'mentality' && is_blog && <img width="100%" src={image || defaultImage}/>}
									{type === 'mentality' && is_video &&
									<div className="type-video-iframe" dangerouslySetInnerHTML={this.createMarkup(video)}/>}
								</div>
							</div>
							<div className="col-xs-12 col-lg-9">
								<div className={`${browser.is.mobile ? 'container' : ''}`}>
									<h2 className="feed-featured-post-title" dangerouslySetInnerHTML={this.createMarkup(title)}/>
									<div className="feed-featured-post-date">Posted {moment(date).format('DD.MM.YYYY')}</div>
									<div className="feed-featured-post-content">
										{
											truncate(description, {
												'length': browser.is.mobile ? 120 : 600,
												'separator': ' '
											})
										}
									</div>
									<div className="feed-featured-post-read-more">
										<Link className="btn-read-more" to={`/feed/${type}/${id}`}>Read more</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					:
					<div className="feed-post">
						<div className={`${browser.is.mobile ? 'container' : ''}`}>
							<div className="row">
								<div className="col-xs-4 col-lg-3">
									{type === 'podcast' && <img width="100%" src={image || defaultImage}/>}
									{type === 'mentality' && is_blog && <img width="100%" src={image || defaultImage}/>}
									{type === 'mentality' && is_video &&
									<div className="type-video-iframe" dangerouslySetInnerHTML={this.createMarkup(video)}/>}
								</div>
								<div className="col-xs-8 col-lg-9">
									<h4 className="feed-post-title">
										<Link to={`/feed/${type}/${id}`} dangerouslySetInnerHTML={this.createMarkup(title)}/>
									</h4>
									<div className="feed-post-content">
										{
											truncate(description, {
												'length': browser.is.mobile ? 120 : 600,
												'separator': ' '
											})
										}
									</div>
									<div className="feed-post-date">Posted {moment(date).format('DD.MM.YYYY')}</div>
								</div>
							</div>
						</div>
					</div>}
			</div>
		);
	}
}
