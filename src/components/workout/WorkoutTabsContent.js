import React, {Component} from 'react';

export default class WorkoutTabsContent extends Component {

	render() {
		const {number, children, className} = this.props;
		return (
			<li className={`list-group-item ${className}`}>
				<span className="pull-left list-number">{number}</span>
				<div>
					{children}
				</div>
			</li>
		);
	}
}
