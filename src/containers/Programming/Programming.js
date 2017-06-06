import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {
	MenubarBlue,
	ProgrammingHeader,
	BottomNav,
	DailyBrief,
	TrackBanner,
	ProgrammingTabs
} from '../../components';
import {Link} from "react-router";
import {connect} from "react-redux";
import gymBodyImg from '../../../static/gym-body.jpg';
import ReactSwipe from 'react-swipe';

@connect(
	state => ({user: state.auth.user}),
	{}
)
export default class Programming extends Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedTrack: "Lifestyle"
		}
	}

	static allTracks = [
		'Lifestyle',
		'Dynamic',
		'Hyper',
		'Strength'
	];

	selectTrack = (newSelectedTrack) => {
		this.setState({
			selectedTrack: newSelectedTrack
		})
	};

	render() {
		const {user} = this.props;

		const leftSideContent = (
			<Link to="/edit-tracks">
				<span className="icon-user-edit"/>
			</Link>
		);

		const rightSideContent = (
			<Link to="/workout-mode">
				<span className="icon-workout-mode"/>
			</Link>
		);

		const swipeConfig = {
			callback: (index, elem) => this.selectTrack(elem.getAttribute('name'))
		};

		return (
			<div className="programming-page-wrapper bottom-padding">
				<Helmet title="Programming"/>
				<MenubarBlue
					title="Programming"
					leftSideContent={leftSideContent}
					rightSideContent={rightSideContent}
				/>
				<ProgrammingHeader user={user}/>
				<ReactSwipe className="carousel" swipeOptions={swipeConfig}>
					{Programming.allTracks.map((track, i) => {
						return (
							<div name={track} key={i}>
								<DailyBrief user={user}/>
								<TrackBanner
									midContent=""
									title="emom"
									bgImg={gymBodyImg}
								/>
								<ProgrammingTabs/>
							</div>
						);
					})}
				</ReactSwipe>
				<BottomNav/>
			</div>
		);
	}
}
