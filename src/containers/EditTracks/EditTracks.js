import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactSwipe from 'react-swipe';
import {connect} from "react-redux";
import {Link} from "react-router";
import {asyncConnect} from 'redux-async-connect';
import {includes} from 'lodash';
import {startsWith} from 'lodash';

import {
	isLoaded as isTracksLoaded,
	load as loadTracks,
	addAsOnlyTrack,
	addToTrackList,
	remove as removeTrack
} from '../../redux/modules/selectedTracksStore';
import {
	MenubarWhite,
	JumbotronWhite,
	EditTracksDotsContainer,
	EditTracksBanner,
	EditTracksMidSection,
	BtnBottom
} from '../../components';
import './EditTracks.scss';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isTracksLoaded(getState())) {
			promises.push(dispatch(loadTracks()));
		}

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		selectedTracksStore: state.selectedTracksStore,
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{addAsOnlyTrack, addToTrackList, removeTrack}
)

export default class EditTracks extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedTrack: "dynamic"
		}
	}

	selectTrack = (newSelectedTrack) => {
		this.setState({
			selectedTrack: newSelectedTrack
		});
	};

	addAsOnlyTrack = () => {
		this.props.addAsOnlyTrack(this.state.selectedTrack);
	};

	addToTrackList = () => {
		this.props.addToTrackList(this.state.selectedTrack);
	};

	removeTrack = () => {
		this.props.removeTrack(this.state.selectedTrack);
	};

	render() {
		const {vaultAccess} = this.props;

		const rightSideContent = (
			<Link to="/programming" className="turquoise-color">
				Done
			</Link>
		);

		let accessOfProgrammingType = null;
		if (includes(vaultAccess, 'programming-all')) accessOfProgrammingType = 'all';
		else if (includes(vaultAccess, 'programming-single')) accessOfProgrammingType = 'single';
		else if (includes(vaultAccess, 'programming-masters')) accessOfProgrammingType = 'masters';

		return (
			<div className="edit-tracks-wrapper">
				<Helmet title="Edit Tracks"/>

				<MenubarWhite
					title="Edit Tracks"
					rightSideContent={rightSideContent}
				/>

				{accessOfProgrammingType ? this.renderEditTracks(accessOfProgrammingType) : this.renderNoVaultAccess()}

			</div>
		);
	}

	renderEditTracks(accessOfProgrammingType) {
		const {selectedTracksStore} = this.props;

		const swipeConfig = {
			callback: (index, elem) => this.selectTrack(elem.getAttribute('name'))
		};

		const selectedTrackIsSubscribed = selectedTracksStore.allTracks.filter(track => {
			return track.title === this.state.selectedTrack;
		})[0].isSubscribed;

		return (
			<div>
				<EditTracksDotsContainer
					selectedTrack={this.state.selectedTrack}
					allTracks={selectedTracksStore.allTracks}
				/>

				<ReactSwipe className="carousel" swipeOptions={swipeConfig}>
					{selectedTracksStore.allTracks.map((track, i) => {
						return (
							<div name={track.title} key={i}>
								<EditTracksBanner
									bgImg={track.bgImg}
									title={track.title}
									trackIconClassName={track.trackIconClassName}
									isSubscribed={track.isSubscribed}
								/>
								<EditTracksMidSection/>
							</div>
						);
					})}
				</ReactSwipe>

				{accessOfProgrammingType === 'all' ? this.renderButtonsForProgrammingAll(selectedTrackIsSubscribed) : undefined}
				{accessOfProgrammingType === 'single' ? this.renderButtonsForProgrammingSingle(selectedTrackIsSubscribed) : undefined}
				{accessOfProgrammingType === 'masters' ? this.renderButtonsForProgrammingMasters(selectedTrackIsSubscribed) : undefined}

			</div>
		);
	}

	renderNoVaultAccess() {
		return (
			<div>
				<JumbotronWhite title="No Access"
												description={<span>You do not have access to edit track</span>}
												logo={true}/>
			</div>
		);
	}

	renderButtonsForProgrammingSingle(selectedTrackIsSubscribed) {

		let visibleTrackStartsWithMasters = startsWith(this.state.selectedTrack, 'masters');

		return (
			<div>
				{selectedTrackIsSubscribed ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-fixed-bottom btn-danger btn-font-lg"
						title="Delete This Track"
						icon={<span className="icon-trash"/>}
						onClick={this.removeTrack}
					/> : undefined }

				{!selectedTrackIsSubscribed && visibleTrackStartsWithMasters ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-fixed-bottom btn-turquoise btn-font-lg"
						title="Update Subscription"
						onClick={e => console.log('subscription update')}
						icon={<span className="icon-update-sub"/>}
					/> : undefined
				}

				{!selectedTrackIsSubscribed && !visibleTrackStartsWithMasters ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-fixed-bottom btn-turquoise btn-font-lg"
						title="Add This Track"
						icon={<span className="icon-nav-links"/>}
						onClick={this.addAsOnlyTrack}
					/> : undefined
				}
			</div>
		)
	}

	renderButtonsForProgrammingAll(selectedTrackIsSubscribed) {

		let visibleTrackStartsWithMasters = startsWith(this.state.selectedTrack, 'masters');

		return (
			<div>
				{selectedTrackIsSubscribed ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-fixed-bottom btn-danger btn-font-lg"
						title="Delete This Track"
						icon={<span className="icon-trash"/>}
						onClick={this.removeTrack}
					/> : undefined }

				{!selectedTrackIsSubscribed && visibleTrackStartsWithMasters ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-fixed-bottom btn-turquoise btn-font-lg"
						title="Update Subscription"
						onClick={e => console.log('subscription update')}
						icon={<span className="icon-update-sub"/>}
					/> : undefined
				}

				{!selectedTrackIsSubscribed && !visibleTrackStartsWithMasters ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-fixed-bottom btn-turquoise btn-font-lg"
						title="Add This Track"
						icon={<span className="icon-nav-links"/>}
						onClick={this.addToTrackList}
					/> : undefined
				}
			</div>
		)
	}

	renderButtonsForProgrammingMasters(selectedTrackIsSubscribed) {

		let visibleTrackStartsWithMasters = startsWith(this.state.selectedTrack, 'masters');
		return (
			<div>
				{selectedTrackIsSubscribed ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-fixed-bottom btn-danger btn-font-lg"
						title="Delete This Track"
						icon={<span className="icon-trash"/>}
						onClick={this.removeTrack}
					/> : undefined }

				{!selectedTrackIsSubscribed && visibleTrackStartsWithMasters ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-fixed-bottom btn-turquoise btn-font-lg"
						title="Add This Track"
						icon={<span className="icon-nav-links"/>}
						onClick={this.addAsOnlyTrack}
					/> : undefined
				}

				{!selectedTrackIsSubscribed && !visibleTrackStartsWithMasters ?
					undefined : undefined
				}
			</div>
		)
	}
}
