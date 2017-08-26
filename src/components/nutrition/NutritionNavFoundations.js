import React, {Component} from 'react';

export default class NutritionNavFoundations extends Component {

	render() {
		const {foundations, selectedFoundationId, onMenuItemClick} = this.props;

		return (
			<div className="nutrition-nav assessment-tabs-nav">
				{foundations.map((foundation, i) => {
					return (
						<div 
							className={`nutrition-nav-item col-xs-12 col-sm-4 col-md-3 ${selectedFoundationId === foundation.id ? 'active': ''}`} 
							key={i}
						>
							<a href="javascript:;" onClick={e => onMenuItemClick(foundation.id)}>
								<span className="text">{foundation.menu_title}</span>
								<span className="icon-arrow-right pull-right"/>
							</a>
						</div>
					);
				})}
			
				<div className="clearfix"/>
			</div>
		);
	}
}