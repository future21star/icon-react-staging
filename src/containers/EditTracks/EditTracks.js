import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactSwipe from 'react-swipe';
import {connect} from "react-redux";
import {Link} from "react-router";
import {asyncConnect} from 'redux-async-connect';
import {isLoaded as isTracksLoaded, load as loadTracks, add as addTrack, remove as removeTrack} from '../../redux/modules/userTracks';
import {
	MenubarWhite,
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
	state => ({userTracks: state.userTracks}),
	{addTrack, removeTrack}
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

	addTrack = (track) => {
		this.props.addTrack(track.title);
	};

	removeTrack = (track) => {
		this.props.removeTrack(track.title);
	};

	render() {
		const {userTracks} = this.props;

		const rightSideContent = (
			<Link to="/programming" className="turquoise-color">
				Done
			</Link>
		);

		const swipeConfig = {
			callback: (index, elem) => this.selectTrack(elem.getAttribute('name')),
			continuous: false
		};

		return (
			<div className="edit-tracks-wrapper">
				<Helmet title="Edit Tracks"/>

				<MenubarWhite
					title="Edit Tracks"
					rightSideContent={rightSideContent}
				/>

				<EditTracksDotsContainer
					selectedTrack={this.state.selectedTrack}
					allTracks={userTracks.allTracks}
				/>

				<ReactSwipe className="carousel" swipeOptions={swipeConfig}>
					{userTracks.allTracks.map((track, i) => {
						return (
							<div name={track.title} key={i}>
								<EditTracksBanner
									bgImg={track.bgImg}
									title={track.title}
									trackIconClassName={track.trackIconClassName}
									isSubscribed={track.isSubscribed}
								/>
								<EditTracksMidSection/>

								{track.isSubscribed ?
									<BtnBottom
										classNames="btn btn-block btn-lg btn-fixed-bottom btn-danger btn-font-lg"
										title="Delete This Track"
										icon={<span className="icon-trash"/>}
										onClick={e => this.removeTrack(track)}
									/> : undefined }

								{!track.isSubscribed ?
									<BtnBottom
										classNames="btn btn-block btn-lg btn-fixed-bottom btn-turquoise btn-font-lg"
										title="Add This Track"
										icon={<span className="icon-nav-links"/>}
										onClick={e => this.addTrack(track)}
									/> : undefined }
							</div>
						);
					})}
				</ReactSwipe>


				{/* TODO: need to add update subscription button*/}
				{/*<BtnBottom
				 classNames="btn btn-block btn-lg btn-fixed-bottom btn-turquoise btn-font-lg"
				 title="Update Subscription"
				 icon={iconUpdate}
				 />*/}
			</div>
		);
	}
}
