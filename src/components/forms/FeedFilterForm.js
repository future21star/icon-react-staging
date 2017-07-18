import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {setActiveFilterTopic} from '../../redux/modules/feedStore';
import {Link} from "react-router";

@connect(
	state => ({
		filterTopics: state.feedStore.filterTopics,
		activeFilterTopic: state.feedStore.activeFilterTopic
	}),
	{setActiveFilterTopic}
)

export default class FeedFilterForm extends Component {
	static propTypes = {};

	render() {
		const {filterTopics, setActiveFilterTopic, activeFilterTopic} = this.props;

		return (
			<form action="#" className="filter-form">
				{filterTopics.map((filterTopic, i) => {
					return (
						<div key={i}>
							<input type="radio" checked={activeFilterTopic === filterTopic.id} id={`filter-topic-${filterTopic.id}`}
										 name="radio-group" onChange={e => setActiveFilterTopic(filterTopic.id)}/>
							<label htmlFor={`filter-topic-${filterTopic.id}`}>{filterTopic.name}</label>
						</div>
					)
				})}

				{activeFilterTopic && (
					<Link to={`/feed/topic/${activeFilterTopic}`} className="btn btn-primary btn-lg btn-block btn-fixed-bottom">
						<span className="icon-filter"/> Apply Filter
					</Link>
				)}
			</form>
		);
	}
}
