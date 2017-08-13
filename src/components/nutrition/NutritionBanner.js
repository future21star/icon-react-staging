import React, {Component, PropTypes} from 'react';
import strengthBG from '../../../static/strengthBG.jpg';



export default class NutritionBanner extends Component {
	static propTypes = {
		isLanding: PropTypes.bool
	};

	render() {
		const {isLanding} = this.props;

		let style = {backgroundImage: 'url(' + strengthBG + ')'};
		let classes= isLanding ? 'nutrition-banner-wrapper col-xs-12 full-height-menu-header is-landing' : 'nutrition-banner-wrapper col-xs-12 col-sm-4';

		return (
			<div className={classes} style={style}>
				<div className="overlay"/>
				<div className="nutrition-banner-title text-center">
					<h2>The Lean Machine</h2>
					<p>Goal: Sustainable Weight Loss</p>
					<button className="block btn btn-lg btn-icon btn-icon-outline">Change Track</button>
				</div>
				{!isLanding && (
					<div className="nutrition-banner-content">
					</div>
				)}
				
			</div>
		);
	}
}


