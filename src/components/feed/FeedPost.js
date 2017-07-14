import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";
import {truncate} from "lodash";
import moment from 'moment';

export default class FeedPost extends Component {
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
		'audio': PropTypes.string
	};

	render() {
		const {type, title, id, date, description, image, audio} = this.props;

		const defaultImage = require('../../../static/logo.png');

		return (
			<div className="feed-post">
				<div className="container">
					<div className="row">
						<div className="col-sm-6 col-xs-4">
							<img width="100%" src={image || defaultImage}/>
						</div>
						<div className="col-sm-6 col-xs-8">
							<h4 className="feed-post-title">
								<Link to={`/feed/${type}/${id}`}>{title}</Link>
							</h4>
							<div className="feed-post-content">
								{
									truncate(description, {
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
