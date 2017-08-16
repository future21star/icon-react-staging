import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';


export default class NutritionPostPreview extends Component {

	createMarkup = (html) => {
		return {__html: html}
	};

	render() {
		const {post} = this.props;

		// @eli, uncomment this to see what properties the post variable has
		// console.lg(post);


		return (
			<div className="">
				<h3 className="lead" dangerouslySetInnerHTML={this.createMarkup(post.title.rendered)}/>
				<div dangerouslySetInnerHTML={this.createMarkup(post.excerpt.rendered)}/>
				<Link to={`/nutrition/blog/${post.id}`} className="btn btn-default">Read More</Link>
				<hr/>
			</div>
		);
	}
}