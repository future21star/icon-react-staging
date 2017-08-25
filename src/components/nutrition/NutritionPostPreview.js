import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import moment from 'moment';


export default class NutritionPostPreview extends Component {

	createMarkup = (html) => {
		return {__html: html}
	};

	render() {
		const {post} = this.props;
		const defaultImage = require('../../../static/feed-default.jpg');


		return (
			<div className="col-sm-6 col-xs-12 feed-post block">
				<div className="col-xs-12 feed-post-image nutrition-post-image">
					<img src={defaultImage} />
				</div>
				<div className="col-xs-12">
					<h3 className="feed-post-title">
						<Link to={`/nutrition/blog/${post.id}`} dangerouslySetInnerHTML={this.createMarkup(post.title.rendered)}/>
					</h3>
					<div className="feed-post-date">Posted {moment(post.date).format('DD.MM.YYYY')}</div>
					<div className="nutrition-preview-description" dangerouslySetInnerHTML={this.createMarkup(post.excerpt.rendered)}/>

					<div className="feed-featured-post-read-more">
						<Link className="btn-read-more" to={`/nutrition/blog/${post.id}`}>Read More</Link>
					</div>
				</div>
				<div className="clearfix"/>
			</div>
		);
	}
}