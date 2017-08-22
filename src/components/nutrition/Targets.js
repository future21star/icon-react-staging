import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';


export default class Targets extends Component {
	static propTypes = {
		isCalculator: PropTypes.bool,
		isTransparent: PropTypes.bool,
		calories: PropTypes.string.isRequired,
		carbs: PropTypes.string.isRequired,
		protein: PropTypes.string.isRequired
	};


	render() {
		const{isCalculator, isTransparent, calories, carbs, protein} = this.props;
		
		let classes = isTransparent ? 'nutrition-data-list-transparent' : '';

		return (
			<div className={`nutrition-data-list row ${classes}`}>

				{!isCalculator && (
					<div className="list-title-wrapper row">
						<p className="col-xs-6 list-title">Targets</p>
							<div className="col-xs-6 text-right calculator-link-wrapper">
							<Link to="/nutrition/calculator">
									Calculate
									<span className="icon icon-nutrition-calculator"/>
							</Link>
						</div>
					</div>
				)}

				<div className="col-xs-4 list-item calories">
					<p>Calories</p>
					<h4>{calories}</h4>
				</div>
				<div className="col-xs-4 list-item carbs">
					<p>Gr Carbs</p>
					<h4>{carbs}</h4>
				</div>
				<div className="col-xs-4 list-item protein">
					<p>Gr Protein</p>
					<h4>{protein}</h4>
				</div>
			</div>
		);
	}
}