import React, {Component, PropTypes} from 'react';
import './HomeHeader.scss';
import DotList from '../DotList/DotList';

export default class HomeHeader extends Component {

	render() {

		return (
			<div className="home-header-wrapper">
				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<DotList/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
