import React, {Component} from 'react';


export default class NutritionFoundationsPage extends Component {

	createMarkup = (html) => {
		return {__html: html};
	};

	render() {
		const {foundation} = this.props;
		
		return (
			<div>
				<h2>{foundation.page_header}</h2>
				<p>{foundation.page_sub_header}</p>
				<div dangerouslySetInnerHTML={this.createMarkup(foundation.page_content)}/>
			</div>
		);
	}
}