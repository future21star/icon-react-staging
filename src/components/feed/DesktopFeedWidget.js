import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";
import {connect} from "react-redux";

@connect(
	state => ({
		routing: state.routing
	})
)

export default class DesktopFeedWidget extends Component {
	static propTypes = {};

	render() {
		const {name, items, className} = this.props;
		const currentUri = this.props.routing.locationBeforeTransitions.pathname;

		return (
			<div>
				<div className={`sidebar-section-header ${className}`}>
					{name}
				</div>
				<ul className="list-group sidebar-list">
					{items.map((item, i) => {
						return <div key={i}>
							{this.renderMenuItem(item, currentUri)}
						</div>
					})}
				</ul>
			</div>
		);
	}

	renderMenuItem(item, currentUri) {
		return (
			<li className={item.link === currentUri ? 'list-group-item active' : 'list-group-item'}>
				<Link to={item.link}>
					<span className={`${item.icon} ${item.iconClassName}`}/>
					{item.text}
					{item.count ? <span className="pull-right">({item.count})</span> : undefined}
				</Link>
			</li>
		);
	}
}
