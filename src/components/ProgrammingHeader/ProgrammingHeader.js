import React, {Component, PropTypes} from 'react';
import './ProgrammingHeader.scss';
import DayPicker from '../DayPicker/DayPicker';
import DotList from '../DotList/DotList';

export default class ProgrammingHeader extends Component {
	static propTypes = {
		user: PropTypes.object,
	};

	render() {
		const {user} = this.props;

		return user ? (
			<div className="programming-header-wrapper">
				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<DayPicker/>
						</div>
						<div className="col-xs-12">
							<div className="title">Lifestyle Track</div>
							<DotList/>
						</div>
					</div>
				</div>
			</div>) : <div/>;
	}
}
