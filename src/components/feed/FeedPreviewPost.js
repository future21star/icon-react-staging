import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";
import {truncate} from "lodash";
import moment from 'moment';
import {connect} from "react-redux";
import ReactPlayer from 'react-player';

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
		'is_featured': PropTypes.bool,
		'is_row': PropTypes.bool,
		// for type podcast + mentality
		'description': PropTypes.string,
		'image': PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.bool
		]),
		// for type video
		'video_id': PropTypes.string,
		// for type podcast
		'audio': PropTypes.string,
		// for type mentality
		'is_video': PropTypes.bool,
		'is_blog': PropTypes.bool,
		'video_iframe': PropTypes.string
	};

	createMarkup = (html) => {
		return {__html: html};
	};

	render() {
		const {browser, type, title, id, date, description, image, is_featured, is_row, audio, is_blog, is_video, video_iframe, video_id} = this.props;

		const defaultImage = require('../../../static/logo.png');

		let isVideo = type === 'video';
		return (
			<div>
				{ is_featured ?
					<div className={`feed-featured-post feed-post-${type}`}>
						<div className="row no-margin-left-right">
							<div className={isVideo ? 'col-sm-12 col-md-7': 'col-xs-12'}>
								<div className="feed-featured-post-image">
									{isVideo && <ReactPlayer url={`https://vimeo.com/${video_id}`} width="100%"/>}
									{type === 'podcast' && <img width="100%" src={image || defaultImage}/>}
									{type === 'mentality' && is_blog && <img width="100%" src={image || defaultImage}/>}
									{type === 'mentality' && is_video &&
									<div className="type-video-iframe" dangerouslySetInnerHTML={this.createMarkup(video_iframe)}/>}
								</div>
							</div>
							<div className={isVideo ? 'col-sm-12 col-md-5': 'col-xs-12'}>
								<div className={`${browser.is.mobile ? 'container' : ''}`}>
									<h3 className="feed-featured-post-title">
										<Link to={`/feed/${type}/${id}`} dangerouslySetInnerHTML={this.createMarkup(title)}/>
									</h3>
									<div className="feed-featured-post-date">Posted {moment(date).format('DD.MM.YYYY')}</div>
									{description && (
										<div className="feed-featured-post-content">
											{
												truncate(description, {
													'length': 220,
													'separator': ' '
												})
											}
										</div>
									)}
									{!isVideo && (
										<div className="feed-featured-post-read-more">
											<Link className="btn-read-more" to={`/feed/${type}/${id}`}>{type === 'podcast' ? 'Listen' : 'Read More'}</Link>
										</div>
									)}
								</div>
							</div>
						</div>					
					</div>
					:
					<div className={`feed-post feed-post-${type}`}>
						<div className={isVideo ? 'col-sm-6' : 'col-sm-6 col-xs-12 display-table-mobile'}>
							<div className={isVideo ? 'col-xs-12 fluid-width-container': 'table-cell-mobile col-sm-12 col-xs-4 feed-post-image'}>
								{type === 'video' && <ReactPlayer url={`https://vimeo.com/${video_id}`} width="100%" height="auto"/>}
								{type === 'podcast' && <img width="100%" src={image || defaultImage}/>}
								{type === 'mentality' && is_blog && <img width="100%" src={image || defaultImage}/>}
								{type === 'mentality' && is_video &&
								<div className="type-video-iframe" dangerouslySetInnerHTML={this.createMarkup(video_iframe)}/>}
							</div>
							<div className={isVideo ? 'col-xs-12': 'table-cell-mobile col-sm-12 col-xs-8'}>
								<h3 className="feed-post-title">
									<Link to={`/feed/${type}/${id}`} dangerouslySetInnerHTML={this.createMarkup(title)}/>
								</h3>
								<div className="feed-post-date">Posted {moment(date).format('DD.MM.YYYY')}</div>
								{description && (
									<div className="feed-post-content">
										{
											truncate(description, {
												'length': 120,
												'separator': ' '
											})
										}
									</div>
								)}
								{!isVideo && (
									<div className="feed-featured-post-read-more">
										<Link className="btn-read-more" to={`/feed/${type}/${id}`}>{type === 'podcast' ? 'Listen' : 'Read More'}</Link>
									</div>
								)}
							</div>
						</div>
						<div className="clearfix"/>
					</div>
				}
				<div className={is_row ? 'clearfix' : ''} />
			</div>
		);
	}
}
