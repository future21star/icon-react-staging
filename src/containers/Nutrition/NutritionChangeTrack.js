import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
	Menubar, 
	NoAccess,
	NutritionTrack 
} from '../../components/index';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';

@connect(
	state => ({
		user: state.authStore.user
	}),
	{}
)

export default class NutritionChangeTrack extends Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedTrack: 'lean'
		}
	}

	selectTrack = (selectedTrack) => {
		this.setState({
			selectedTrack: selectedTrack
		});
	};

	render() {
		const {user} = this.props;

		if(!user) return <div/>;

		const {selectedTrack} = this.state;

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
				<div className="assessment-landing-wrapper bottom-padding">
					<Helmet title="Change Track"/>

					<Menubar 
						title="Change Track"
						className="menu-bar-red"
						backButton={true}
					/>
					<div className="container-fluid">
						<div className="assessment-tabs-nav row">
							
							<div onClick={e => this.selectTrack('lean')} className={`col-xs-12 col-sm-4 col-md-4 ${selectedTrack === 'lean' ? "active" : ""}`}>
								<a href="javascript:;">The Lean Machine</a>
							</div>
							<div onClick={e => this.selectTrack('perfector')} className={`col-xs-12 col-sm-4 col-md-4 ${selectedTrack === 'perfector' ? "active" : ""}`}>
								<a href="javascript:;">The Perfector</a>
							</div>
							<div onClick={e => this.selectTrack('gainer')} className={`col-xs-12 col-sm-4 col-md-4 ${selectedTrack === 'gainer' ? "active" : ""}`}>
								<a href="javascript:;">The Gainer</a>
							</div>

						</div>
					</div>

					<div className="container assessment-tabs-content nutrition-track-tabs-content">
						<div className="row">
							<div className="col-xs-12">
							{ selectedTrack === 'lean' && (
								<NutritionTrack
									icon="icon-track-lean-machine"
									header="Lean Machine"
									goalsDesc="The goal is to consume less calories than what your body needs to support weight loss; we also want to make sure you’re not going too low in calories."
									goals={[
										"Athletes that go too low in calories risk slowing down their metabolic rate, which ultimately works against our weight loss efforts.",
										"Our goal is to find that ‘sweet spot’ where you can lose ~0.5 – 1 lb a week while still eating as much as possible. This takes some fine-tuning.",
										"In the next step we will come up with a starting point for calories (and we will teach you how to know if you’re reaching this goal); we will also provide some recommendations on how you can fine-tune this so that if your progress results in greater or less weight loss, you can make the necessary adjustments.",
										"We are all different and our bodies will respond slightly differently than others to weight loss efforts, so while we start with more broad recommendations, these can be adjusted according to your own individual needs."
									]}
									expectations={[
										"Athletes can expect to lose 0.5 – 1.0 lbs a week (resulting from a 250 – 500 calorie deficit a day). If they are losing more than this then they are eating too few calories.",
										"Athletes should still expect to meet all of their nutrient needs with a balanced diet, and athletes should not feel hungry all of the time. Athletes will discover how to customize their approach to changing body composition to find what works best for them."
									]}
									desc="Healthy and Sustainable weight loss is slow and gradual and is the name of the game here. Anyone who loses 5 lbs in a week has: (A) mostly lost water weight and (B) is likely to gain it all back quickly."
								/>
							)}
							{ selectedTrack === 'perfector' && (
								<NutritionTrack
									icon="icon-track-perfector"
									header="Perfector"
									goalsDesc="You can realistically expect to increase your lean body mass (muscle!) and perhaps see a decrease in fat mass, ultimately improving your tone and strength."
									goals={[
										"Your weight may fluctuate mildly – a couple of pounds – or even more than that . Some athletes are able to decrease their percent body fat and see a 10 lb increase on the scale because they have increased their muscle mass. How impressive is that?",
										"Everyone’s body is different and each individual response will vary. Some individuals gain muscle mass at a more rapid rate than others; some individuals lose fat more rapidly.",
										"Your stage of training will also have an impact – individuals who have been working at this for a longer time will likely see more gradual changes, and someone who is starting the Icon program with minimal exercise experience may see more rapid changes."
									]}
									expectations={[
										"Daily intake will support the athlete in achieving their optimal performance as well as overall health goals and assist the athlete in finding what works best for them.",
										"Actual weight may fluctuate slightly overtime. These athletes can also expect to see some shifts in body composition that can include increased muscle mass and decreased fat mass."
									]}
									desc="Weight maintenance is the name of this game. These individuals are trying to perfect an already good thing. Nutrition recommendations will center around a balanced dietary approach that includes a focus on consistency of nutrient intake and allows the athlete to meet all of their nutrient needs through a balanced diet."
								/>
							)}
							{ selectedTrack === 'gainer' && (
								<NutritionTrack
									icon="icon-track-gainer"
									header="Gainer"
									goalsDesc="A realistic goal is to see an increase in lean body mass; total body mass (weight) may also increase."
									goals={[
										"It is important to realize that to increase muscle mass, 2 things need to happen: you need to increase the stimulus placed on the muscle to achieve hypertrophy (increase in muscle size), and you need to increase the amount of calories you consume beyond what your body needs to maintain its weight.",
										"Eating more protein (or more of anything) without the stimulus of resistance exercise will not result in hypertrophy (just an increase in fat mass); conversely, strength training in the absence of excess calories (particularly the right types of calories) will result in muscle breakdown.",
										"Both components – strength training and proper nutrition – are required.",
										"Icon nutrition provides information on how to achieve both components. Listen to Chris for the resistance training component, and Icon Nutrition will teach you about the proper nutrients needed for added strength gains."
									]}
									expectations={[
										"A weight gain of up to 0.5 to 1.0 lbs can be expected. A weight gain at a more rapid rate indicates a probable gain in fat mass, typically not what the athlete is seeking.",
										"Nutrition recommendations will address what types of foods are the focus here as well as the importance of timing of intake and how food should be distributed throughout the day.",
										"Athletes in this track can still expect to meet their daily nutrient needs through a varied diet and will find an approach that works best for them."
									]}
									desc="While not just for ‘meatheads,’ the gainer track is geared towards athletes that really want to focus on increased muscle mass. Nutrition recommendations will support a slow and gradual increase in body weight coming primarily from lean muscle mass."
								/>
							)}
							</div>
						</div>	
					</div>

				</div>
			</ReactCSSTransitionGroup>
		);
	}

}

