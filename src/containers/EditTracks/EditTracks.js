import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {MenubarWhite, EditTracksDotsContainer, EditTracksBanner, EditTracksMidSection, BtnBottom} from '../../components';
import {Link} from "react-router";
import './EditTracks.scss';
import dynamicBG from '../../../static/dynamicBG.jpg';
import strengthBG from '../../../static/strengthBG.jpg';
import lifestyleBG from '../../../static/lifestyleBG.jpg';
import hyperBG from '../../../static/hyperBG.jpg';

export default class EditTracks extends Component {

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

		return (
			<div className="edit-tracks-wrapper">
				<Helmet title="Edit Tracks"/>
				<MenubarWhite
					title="Edit Tracks"
					rightSideContent={rightSideContent}
				/>
				<EditTracksDotsContainer/>
				<EditTracksBanner
					bgImg={dynamicBG}
					title="Dynamic"
					trackIcon={trackIconDynamic}
				/>
				{/*<EditTracksBanner
					bgImg={strengthBG}
					title="Strength"
					trackIcon={trackIconStrength}
				/>
				<EditTracksBanner
					bgImg={lifestyleBG}
					title="Lifestyle"
					trackIcon={trackIconLifestyle}
				/>
				<EditTracksBanner
					bgImg={lifestyleBG}
					title="Hyper"
					trackIcon={trackIconHyper}
				/>*/}
				<EditTracksMidSection/>
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
