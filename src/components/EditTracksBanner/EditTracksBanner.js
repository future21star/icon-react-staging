import React, {Component, PropTypes} from 'react';
import './EditTracksBanner.scss';

export default class EditTracksBanner extends Component {

	static propTypes = {
		bgImg: PropTypes.string,
		title: PropTypes.string,
		trackIconClassName: PropTypes.string,
		isSubscribed: PropTypes.bool
	};

	getIcon() {
		const {trackIconClassName} = this.props;

		if (trackIconClassName === 'icon-track-dynamic') {
			return (
				<span className="icon-track-dynamic">
					<span className="path1"/>
					<span className="path2"/>
					<span className="path3"/>
					<span className="path4"/>
					<span className="path5"/>
					<span className="path6"/>
					<span className="path7"/>
					<span className="path8"/>
				</span>
			);
		}

		else if (trackIconClassName === 'icon-track-strength') {
			return (
				<span className="icon-track-strength">
					<span className="path1"/>
					<span className="path2"/>
					<span className="path3"/>
					<span className="path4"/>
					<span className="path5"/>
					<span className="path6"/>
					<span className="path7"/>
				</span>);
		}

		else if (trackIconClassName === 'icon-track-lifestyle') {
			return (
				<span className="icon-track-lifestyle">
					<span className="path1"/>
					<span className="path2"/>
					<span className="path3"/>
					<span className="path4"/>
					<span className="path5"/>
					<span className="path6"/>
					<span className="path7"/>
				</span>);
		}

		else if (trackIconClassName === 'icon-track-hyper') {
			return (
				<span className="icon-track-hyper">
				<span className="path1"/>
				<span className="path2"/>
				<span className="path3"/>
				<span className="path4"/>
				<span className="path5"/>
				<span className="path6"/>
				<span className="path7"/>
				<span className="path8"/>
				<span className="path9"/>
				<span className="path10"/>
			</span>);
		}


		return (
			<span className="fa fa-circle-o"/>
		)
	}

	render() {
		const {bgImg, title, trackIcon, isSubscribed} = this.props;

		return (
			<div className="edit-tracks-banner-wrapper container-small">
				<div className="edit-tracks-banner" style={{backgroundImage: 'url(' + bgImg + ')',}}>
					<div className="overlay"/>
					<div className="title">
						{this.getIcon()}
						<h1>{title}</h1>
						{isSubscribed ? <span className="icon-checkmark"/> : undefined}
					</div>
				</div>
			</div>
		);
	}
}
