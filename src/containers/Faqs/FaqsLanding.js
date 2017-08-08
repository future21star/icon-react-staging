import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Menubar} from '../../components/index';
import {Link} from "react-router";
import {asyncConnect} from 'redux-async-connect';
import {loadFaqs, isFaqsLoaded} from "../../redux/modules/helpfulLinksStore";

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isFaqsLoaded(getState())) {
			promises.push(dispatch(loadFaqs()));
		}

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		faqs: state.helpfulLinksStore.faqs
	}),
	{}
)


export default class FaqsLanding extends Component {

	createMarkup = (html) => {
		return {__html: html};
	};


	render() {
		const {faqs} = this.props;

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
				<div className="bottom-padding">
					<Helmet title="FAQ's"/>

					<Menubar 
						title="FAQ's" 
						backButton={true}
					/>

					<div className="container">
						<div className="row">
							{faqs.map((faq, i) => {
								return (
									<div className="col-xs-12 col-md-6" key={i}>
										<div className="faq-category">
											<Link to={`faqs/${faq.slug}`}>
												<h2 className="faq-category-title">{faq.name}</h2>
												<div className="faq-category-count"># of FAQ's: {faq.count}</div>
												<div className="faq-category-desc">{faq.description}</div>
											</Link>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				

				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

