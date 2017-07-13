import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";
import {truncate} from "lodash";
import moment from 'moment';

export default class FeedPost extends Component {
	static propTypes = {
		'title': PropTypes.string.isRequired,
		'body': PropTypes.string.isRequired,
		'imageSizes': PropTypes.object,
		'date': PropTypes.string.isRequired,
	};

	render() {
		const {title, body, imageSizes, date} = this.props;

		let image = null;
		if (imageSizes) {
			image = imageSizes.thumbnail.source_url;
		} else {
			image = require('../../../static/logo.png');
		}

		return (
			<div className="feed-post">
				<div className="container">
					<div className="row">
						<div className="col-xs-6">
							<img width="100%" src={image}/>
						</div>
						<div className="col-xs-6">
							<div className="feed-post-title">
								<Link to="/feed/single">{title}</Link>
							</div>
							<div className="feed-post-content">
								{
									truncate(body, {
										'length': 120,
										'separator': ' '
									})
								}
							</div>
							<div className="feed-post-date">Posted {moment(date).format('DD.MM.YYYY')}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
