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

		const noteContent = (

			<div>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et felis varius,
					lobortis sapien a, vestibulum ex. Nunc interdum lobortis nulla a semper. Praesent rutrum dolor
					aliquam massa gravida.
				</p>
				<p>
					Donec ut lobortis erat, quis volutpat sapien. Nam sed dolor vitae lacus tincidunt dignissim eu at lacus.
				</p>
			</div>
		);

		return (
			<div className="programming-page-wrapper bottom-padding">
				<Helmet title="Programming"/>
				<MenubarBlue
					title="Programming"
					leftSideContent={leftSideContent}
					rightSideContent={rightSideContent}
				/>
				<ProgrammingHeader
					user={user}
					selectedTrack={this.state.selectedTrack}
					allTracks={Programming.allTracks}
				/>
				<ReactSwipe className="carousel" swipeOptions={swipeConfig}>
					{Programming.allTracks.map((track, i) => {
						return (
							<div name={track} key={i}>
								<DailyBrief user={user}/>
								<TrackBanner
									midContent=""
									title="emom"
									bgImg={gymBodyImg}
									noteContent={noteContent}
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
