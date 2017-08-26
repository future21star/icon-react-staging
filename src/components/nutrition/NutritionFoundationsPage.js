import React, {Component} from 'react';


export default class NutritionFoundationsPage extends Component {

	createMarkup = (html) => {
		return {__html: html};
	};

	render() {
		const {foundation} = this.props;
		
		return (
			<div dangerouslySetInnerHTML={this.createMarkup(foundation.page_content)}/>
		);
	}
}