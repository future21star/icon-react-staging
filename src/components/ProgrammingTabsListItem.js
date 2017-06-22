import React, {Component} from 'react';

export default class ProgrammingTabsListItem extends Component {

	render() {
		const {number, children} = this.props;
		return (
			<li className="list-group-item">
				<span className="pull-left list-number">{number}</span>
				{children}
			</li>
		);
	}
}
