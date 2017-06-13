import React, {Component, PropTypes} from 'react';
import './ProgrammingHeader.scss';
import DayPicker from '../DayPicker/DayPicker';
import DotList from '../DotList/DotList';

export default class ProgrammingHeader extends Component {
	static propTypes = {
		user: PropTypes.object,
		onDayPickerDateChange: PropTypes.func.isRequired,
		activeWeek: PropTypes.string.isRequired
	};

	render() {
		const {user, selectedTrack, allTracks, onDayPickerDateChange, activeWeek} = this.props;

		return user ? (
			<div className="programming-header-wrapper">
				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<DayPicker onDateChange={onDayPickerDateChange} activeWeek={activeWeek}/>
						</div>
						<div className="col-xs-12">
							<div className="title">{selectedTrack} Track</div>
							<DotList
								selectedTrack={selectedTrack}
								allTracks={allTracks}
							/>
						</div>
					</div>
				</div>
			</div>) : <div/>;
	}
}
