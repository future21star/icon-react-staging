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
import {loadWods} from "../../redux/modules/freeWeekStore";

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
			wods: state.freeWeekStore.selectedCategoryWods
		})
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
		document.body.classList.remove('desktop-disable-scrolling');
	}

	render() {
		const {browser, category} = this.props;

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
						<Helmet title="Programming"/>
						<div className="desktop-menu-fixed">
							<Menubar
									title="Programming"
									backButton={true}
									className="text-white programming-menu-bar"
							/>

							<ProgrammingHeader showWeekNavOnMobile={this.state.showWeekNavOnMobile}/>
						</div>

						{this.renderWod()}

					</div>
				</ReactCSSTransitionGroup>
		)
	}

	renderWod() {
		const {browser, wods, category} = this.props;
		let content = null;

		if (!category) {
			content = <LoadingLogo/>;
		} else if (wods.length) {
			// todo: select
			let wod = wods[0];

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
