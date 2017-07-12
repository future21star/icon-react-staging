import React, {Component, PropTypes} from 'react';

export default class FeedFilterForm extends Component {
	static propTypes = {};

	render() {

		return (
			<form action="#" className="filter-form">
				<div>
					<input type="radio" id="topic1" name="radio-group"/>
					<label htmlFor="topic1">Topic 1</label>
				</div>
				<div>
					<input type="radio" id="topic2" name="radio-group"/>
					<label htmlFor="topic2">Topic 2</label>
				</div>
				<div>
					<input type="radio" id="topic3" name="radio-group"/>
					<label htmlFor="topic3">Topic 3</label>
				</div>
				<div>
					<input type="radio" id="topic4" name="radio-group"/>
					<label htmlFor="topic4">Topic 4</label>
				</div>
				<div>
					<input type="radio" id="topic5" name="radio-group"/>
					<label htmlFor="topic5">Topic 5</label>
				</div>

				<button className="btn btn-primary btn-lg btn-block btn-fixed-bottom"><span className="icon-filter"/> Apply
					Filter
				</button>
			</form>
		);
	}
}
