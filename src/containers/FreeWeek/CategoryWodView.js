import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {
	ProgrammingHeader,
	WorkoutBanner,
	WorkoutTabs,
	Menubar,
	DesktopWorkoutBanner,
	DesktopWorkout,
	RestDay,
	LoadingLogo
} from '../../components/index';
import {connect} from "react-redux";
import {asyncConnect} from 'redux-async-connect';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {loadWods, clearCategoryAndWods} from "../../redux/modules/freeWeekStore";

@asyncConnect([{
	promise: ({store: {dispatch, getState}, params}) => {
		const promises = [];

		dispatch(loadWods(params.categoryId));

		return Promise.all(promises);
	}
}])

@connect(
		state => ({
			browser: state.browser,
			category: state.freeWeekStore.selectedCategory,
			wods: state.freeWeekStore.selectedCategoryWods,
			currentDay: state.freeWeekStore.currentDay
		}),
		{clearCategoryAndWods}
)
export default class CategoryWodView extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showWeekNavOnMobile: false
		};
	}

	toggleShowWeekNavOnMobile = () => {
		this.setState({
			showWeekNavOnMobile: !this.state.showWeekNavOnMobile
		});
	};

	componentDidMount() {
		document.body.classList.toggle('desktop-disable-scrolling');
	}

	componentWillUnmount() {
		this.props.clearCategoryAndWods();
		document.body.classList.remove('desktop-disable-scrolling');
	}

	render() {
		return (
				<ReactCSSTransitionGroup
						transitionName="react-anime"
						transitionAppear={true}
						transitionAppearTimeout={5000}
						transitionEnter={true}
						transitionEnterTimeout={500}
						transitionLeave={true}
						transitionLeaveTimeout={500}
				>
					<div className="programming-page-wrapper bottom-padding">
						<Helmet title="Free Week"/>
						<div className="desktop-menu-fixed">
							<Menubar
									title="Free Week"
									backButton={true}
									className="text-white programming-menu-bar"
							/>

							<ProgrammingHeader freeWeek={true} showWeekNavOnMobile={this.state.showWeekNavOnMobile}/>
						</div>

						{this.renderWod()}

					</div>
				</ReactCSSTransitionGroup>
		)
	}

	renderWod() {
		const {browser, wods, category, currentDay} = this.props;
		let content = null;

		let wod = wods.filter(w => {
			return w.day === currentDay;
		});

		if (wod.length) {
			wod = wod[0];
		} else {
			wod = null;
		}

		if (!category) {
			content = <LoadingLogo/>;
		} else if (category && wod) {

			let desktopWorkoutContent = <DesktopWorkout track={wod}/>;

			content = (
					<div>
						<WorkoutBanner wod={wod} freeWeek={true}/>
						{browser.is.mobile && <WorkoutTabs track={wod}/>}

						{browser.is.desktop && desktopWorkoutContent}
					</div>
			);
		} else {
			content = (
					<RestDay track={category}/>
			);
		}

		return (
				<div className={browser.is.desktop ? 'overflow-custom-scroll' : ''}>
					{content}
				</div>
		);
	}

}
