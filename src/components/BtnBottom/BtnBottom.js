import React, {Component} from 'react';
import './BtnBottom.scss';

export default class BtnBottom extends Component {

	render() {
		const {classNames, icon, title} = this.props;
		return (
			<button className={classNames}>
				{icon}
				{title}
			</button>
		);
	}
}
