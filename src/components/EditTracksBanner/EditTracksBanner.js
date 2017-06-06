import React, {Component, PropTypes} from 'react';
import './EditTracksBanner.scss';

export default class EditTracksBanner extends Component {

	static propTypes = {
		bgImg: PropTypes.string,
		title: PropTypes.string,
		trackIcon: PropTypes.object,
		isSubscribed: PropTypes.bool
	};

	render() {
		const {bgImg, title, trackIcon, isSubscribed} = this.props;
		return (
			<div className="edit-tracks-banner-wrapper">
				<div className="edit-tracks-banner" style={{backgroundImage: 'url(' + bgImg + ')',}}>
					<div className="overlay"/>
					<div className="title">
						{trackIcon}
						<h1>{title}</h1>
						{isSubscribed? <span className="icon-checkmark"/> : undefined}
					</div>
				</div>
			</div>
		);
	}
}
