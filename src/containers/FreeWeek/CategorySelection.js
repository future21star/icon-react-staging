import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Link} from "react-router";
import {asyncConnect} from 'redux-async-connect';
import {
	isLoaded as isFreeWeekCategoriesLoaded,
	load as loadFreeWeekCategories
} from '../../redux/modules/freeWeekStore';
import {Menubar, EditTracksBanner} from '../../components/index';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isFreeWeekCategoriesLoaded(getState())) promises.push(dispatch(loadFreeWeekCategories()));

		return Promise.all(promises);
	}
}])

@connect(
		state => ({
			categories: state.freeWeekStore.categories
		})
)

export default class CategorySelection extends Component {

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
					<div className="edit-tracks-wrapper">
						<Helmet title="Free Week"/>

						<Menubar
								title="Free Week"
								className="menu-bar-transparent menu-color-white"
						/>

						<div className="menu-head-buffer edit-tracks-list-wrapper bottom-padding">
							{this.renderTracks()}
						</div>

					</div>
				</ReactCSSTransitionGroup>
		);
	}

	renderTracks() {
		let {categories} = this.props;

		return (
				<div className="container">
					<div className="row">
						{categories.map((track, i) => {
							return (
									<div className="col-xs-12 col-sm-6" key={i}>
										<div className="thumbnail">
											<EditTracksBanner
													track={track}
													selectedTracks={[]}
													hideInfo={true}
											/>
											<div className="edit-tracks-btn-wrapper">
												<div className="col-xs-12">
													<Link to={`/free-week/${track.id}`} className="btn btn-lg btn-icon">Select</Link>
												</div>
											</div>
										</div>
									</div>
							);
						})}
					</div>
				</div>
		);
	}
}
