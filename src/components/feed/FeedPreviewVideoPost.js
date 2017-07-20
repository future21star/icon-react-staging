import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import ReactPlayer from 'react-player';

@connect(
	state => ({
		browser: state.browser
	})
)

export default class FeedPreviewVideoPost extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showVideoPlayer: false
		}
	}

	static propTypes = {
		'thumbnail_image': PropTypes.string,
		'video_id': PropTypes.string
	};

	handleClickOnImage = () => {
		this.setState({
			showVideoPlayer: true
		})
	};

	render() {
		const {video_id, thumbnail_image} = this.props;
		const {showVideoPlayer} = this.state;

		const defaultImage = require('../../../static/logo.png');

		return (
			<div>
				{showVideoPlayer ? <ReactPlayer url={`https://vimeo.com/${video_id}`} width="100%" height="auto" playing/>
					: (
						<div className="type-video" onClick={this.handleClickOnImage}>
							<img width="100%" src={thumbnail_image || defaultImage}/>
						</div>
					)}
			</div>
		);
	}
}
