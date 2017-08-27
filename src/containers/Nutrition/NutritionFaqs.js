import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Menubar, NoAccessSubscriptionUpgradeCard} from '../../components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {asyncConnect} from 'redux-async-connect';
import {
	isLoaded as isNutritionFaqsLoaded,
	load as loadNutritionFaqs,
} from "../../redux/modules/nutritionFaqsStore";

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isNutritionFaqsLoaded(getState())) {
			promises.push(dispatch(loadNutritionFaqs()));
		}

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		faqs: state.nutritionFaqsStore.faqs
	})
)
export default class NutritionFaqs extends Component {

	constructor(props) {
		super(props);

		this.state = {
			activeFaqItemId: null
		}
	}

	toggleActiveFaqItemId = (faqItemId) => {
		if(this.state.activeFaqItemId === faqItemId) {
			this.setState({
				activeFaqItemId: null
			});
		} else {
			this.setState({
				activeFaqItemId: faqItemId
			});
		}
	};


	createMarkup = (html) => {
		return {__html: html};
	};

	render() {
		const {faqs} = this.props;
		const {activeFaqItemId} = this.state;

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
				<div className="help-page-wrapper bottom-padding">
					<Helmet title="Nutiriton FAQ's"/>

					<Menubar 
						title="Nutiriton FAQ's"
						backButton={true}
					/>

					<div className="container-fluid full-height-menu-header faq-single-container menu-head-buffer">
						<div className="row">
							{faqs.map((faq, i) => {
								return (
									<div className="col-xs-12 col-sm-6 col-md-4" key={i}>
										<div className="faq-single">
											<div className="panel-group">
												<div className="panel panel-default">
													<div className="panel-heading">
														<h4 className="panel-title" onClick={e => this.toggleActiveFaqItemId(faq.id)}>
															{faq.faq_question}
														</h4>
													</div>
													<div className={`panel-collapse collapse ${activeFaqItemId === faq.id ? 'in' : ''}`}>
														<div className="panel-body" dangerouslySetInnerHTML={this.createMarkup(faq.faq_answer)}/>
													</div>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
