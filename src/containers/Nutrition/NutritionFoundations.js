import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';
import {asyncConnect} from 'redux-async-connect';
import {
	Menubar,
	NutritionNavFoundations,
	NutritionFoundationsPage
} from '../../components';
import {
	isLoaded as isNutritionFoundationsLoaded,
	load as loadNutritionFoundations,
} from "../../redux/modules/nutritionFoundationsStore";


@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		//  filter topics
		if (!isNutritionFoundationsLoaded(getState())) promises.push(dispatch(loadNutritionFoundations()));

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		user: state.authStore.user,
		foundations: state.nutritionFoundationsStore.foundations
	}),
)

export default class NutritionFoundations extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			showMenu: true,
			selectedFoundationItem: this.props.foundations[0]
		};
	}

	toggleMenu = () => {
		this.setState({
			showMenu: !this.state.showMenu
		});
	};

	selectFoundation = (id) => {
		const {foundations} = this.props;

		let selectedFoundationItem = foundations.filter(item => {
			return item.id === id;
		})[0];

		this.setState({
			selectedFoundationItem: selectedFoundationItem
		});
	};

	render() {
		const {user, foundations} = this.props;
		const {selectedFoundationItem} = this.state;

		if(!user) {
			return <div/>;
		}
		const {vaultAccess} = this.props;

		let accessToNutrition = includes(vaultAccess, 'nutrition');

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
				<div>
					<Helmet title="Nutrition - Foundations"/>
					<Menubar
						title="Foundations"
						className="menu-bar-grey"
						backButton={true}
						rightSideContent={<a href="javascript:;" onClick={this.toggleMenu}>
							<span className="mobile-hide">Menu</span>
							<span className="icon-menu-more"/>
						</a>}
					/>

					<div className="bottom-padding container-fluid">
						{this.state.showMenu && (
							<div className="row">
								<NutritionNavFoundations 
									foundations={foundations}
									selectedFoundationId={selectedFoundationItem.id}
									onMenuItemClick={this.selectFoundation}
								/>
							</div>
						)}
						<div className="row">
							<div className="col-xs-12 col-md-offset-2 col-md-10">
								<NutritionFoundationsPage foundation={selectedFoundationItem}/>
							</div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
