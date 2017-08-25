import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';


export default class NutritionNavItem extends Component {
	static propTypes = {
		link: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		icon: PropTypes.string,
		horizontal: PropTypes.bool
	};

	render() {
		const{link, text, icon, horizontal} = this.props;

		let classes= horizontal ? 'nutrition-nav-item col-xs-12 col-sm-4 col-md-3' : 'nutrition-nav-item col-xs-12';
		return (
			<div className={classes}>
				<Link to={link}>
					<span className={`icon ${icon}`} />
					<span className="text">{text}</span>
					<span className="icon-arrow-right pull-right"/>
				</Link>
			</div>
		);
	}
}