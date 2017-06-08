import React, {Component, PropTypes} from 'react';
import './BtnBottom.scss';

export default class BtnBottom extends Component {
	static propTypes = {
		classNames: PropTypes.string.isRequired,
		icon: PropTypes.object,
		title: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired
	};

	render() {
		const {classNames, icon, title, onClick} = this.props;

		return (
			<div className="btn-wrapper">
				<button className={classNames} onClick={onClick}>
					{icon}
					{title}
				</button>
			</div>
		);
	}
}
