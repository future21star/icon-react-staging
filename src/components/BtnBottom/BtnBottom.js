import React, {Component, PropTypes} from 'react';
import './BtnBottom.scss';

export default class BtnBottom extends Component {
	static propTypes = {
		classNames: PropTypes.string.isRequired,
		icon: PropTypes.object,
		title: PropTypes.string.isRequired
	};

	render() {
		const {classNames, icon, title} = this.props;

		return (
			<div className="btn-wrapper">
				<button className={classNames}>
					{icon}
					{title}
				</button>
			</div>
		);
	}
}
