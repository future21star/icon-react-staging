import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {MenubarWhite, EditTracksDotsContainer, EditTracksBanner, EditTracksMidSection, BtnBottom} from '../../components';
import {Link} from "react-router";
import './EditTracks.scss';
import dynamicBG from '../../../static/dynamicBG.jpg';
import strengthBG from '../../../static/strengthBG.jpg';
import lifestyleBG from '../../../static/lifestyleBG.jpg';
import hyperBG from '../../../static/hyperBG.jpg';
import ReactSwipe from 'react-swipe';


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
		})
	};

	render() {
		const rightSideContent = (
			<Link to="/programming" className="turquoise-color">
				Done
			</Link>
		);

		const iconTrash = (<span className="icon-trash"/>);
		const iconUpdate = (<span className="icon-update-sub"/>);
		const iconNavLinks = (<span className="icon-nav-links"/>);

		const trackIconDynamic = (<span className="icon-track-dynamic">
									<span className="path1"/>
									<span className="path2"/>
									<span className="path3"/>
									<span className="path4"/>
									<span className="path5"/>
									<span className="path6"/>
									<span className="path7"/>
									<span className="path8"/>
								</span>);

		const trackIconStrength = (<span className="icon-track-strength">
									<span className="path1"/>
									<span className="path2"/>
									<span className="path3"/>
									<span className="path4"/>
									<span className="path5"/>
									<span className="path6"/>
									<span className="path7"/>
								</span>);

		const trackIconLifestyle = (<span className="icon-track-lifestyle">
									<span className="path1"/>
									<span className="path2"/>
									<span className="path3"/>
									<span className="path4"/>
									<span className="path5"/>
									<span className="path6"/>
									<span className="path7"/>
								</span>);

		const trackIconHyper = (<span className="icon-track-hyper">
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

		const swipeConfig = {
			callback: (index, elem) => this.selectTrack(elem.getAttribute('name'))
		};

		const allTracks  = [
			{
				bgImg: dynamicBG,
				title: "Dynamic",
				trackIcon: trackIconDynamic,
				isSubscribed: true
			},
			{
				bgImg: strengthBG,
				title: "Strength",
				trackIcon: trackIconStrength,
				isSubscribed: false
			},
			{
				bgImg: lifestyleBG,
				title: "Lifestyle",
				trackIcon: trackIconLifestyle,
				isSubscribed: true
			},
			{
				bgImg: lifestyleBG,
				title: "Hyper",
				trackIcon: trackIconHyper,
				isSubscribed: false
			}
		];

		return (
			<div className="edit-tracks-wrapper">
				<Helmet title="Edit Tracks"/>

				<MenubarWhite
					title="Edit Tracks"
					rightSideContent={rightSideContent}
				/>

				<EditTracksDotsContainer
					selectedTrack={this.state.selectedTrack}
					allTracks={allTracks}
				/>

				<ReactSwipe className="carousel" swipeOptions={swipeConfig}>
					{allTracks.map((track, i) => {
						return (
							<div name={track.title} key={track.title}>
								<EditTracksBanner
									bgImg={track.bgImg}
									title={track.title}
									trackIcon={track.trackIcon}
									isSubscribed={track.isSubscribed}
								/>
								<EditTracksMidSection/>
							</div>
						);
					})}
				</ReactSwipe>

				<BtnBottom
					classNames="btn btn-block btn-lg btn-fixed-bottom btn-danger btn-font-lg"
					title="Delete This Track"
					icon={iconTrash}
				/>
				{/*<BtnBottom
					classNames="btn btn-block btn-lg btn-fixed-bottom btn-turquoise btn-font-lg"
					title="Update Subscription"
					icon={iconUpdate}
				/>*/}
				{/*<BtnBottom
					classNames="btn btn-block btn-lg btn-fixed-bottom btn-turquoise btn-font-lg"
					title="Add This Track"
					icon={iconNavLinks}
				/>*/}
			</div>
		);
	}
}
