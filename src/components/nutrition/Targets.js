import React, {Component, PropTypes} from 'react';


export default class Targets extends Component {
	static propTypes = {
		isVertical: PropTypes.bool
	};

	render() {
		const {isVertical} = this.props;

		let classesOuter = isVertical ? 'nutrition-data-list nutrition-data-list-vertical col-xs-12 col-sm-6 col-md-4' : 'nutrition-data-list col-xs-12';
		let classesInner = isVertical ? 'col-sm-12' : '';

		return (
			<div className={classesOuter}>
				<div className={`col-xs-4 list-item calories ${classesInner}`}>
					<p>Calories</p>
					<h4>2323</h4>
				</div>
				<div className={`col-xs-4 list-item carbs ${classesInner}`}>
					<p>Gr Carbs</p>
					<h4>350-540</h4>
				</div>
				<div className={`col-xs-4 list-item protein ${classesInner}`}>
					<p>Gr Protein</p>
					<h4>135-162</h4>
				</div>
			</div>
		);
	}
}