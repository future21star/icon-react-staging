import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, BtnBottom} from '../../components/index';
import {connect} from "react-redux";
import {Link} from 'react-router';
import Select from 'react-select';
import {range} from "lodash";
// import {
// 	changeCalculatorField
// } from "../../redux/modules/nutritionCalculatorStore";

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess,
		nutritionCalculatorStore: state.nutritionCalculatorStore,
	}),
	{}
)

export default class NutritionCalculatorResult extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			lean: null,
			perfector: null,
			gainer: null
		}
	}


    harrisBenedict = (ageHeightWeight, gender, activityFactor) => {

        let age = ageHeightWeight.age;
        let height = ageHeightWeight.height;
        let weight = ageHeightWeight.weight;

        let value = "";

        if(gender){
            //run equation for male
            value = 66.47 + (13.75 * weight) + (5 * height) - (6.76 * age);

        }else{
            //run equation for female
            value = 655.1 + (9.6 * weight) + (1.9 * height) - (4.7 * age);
        }

        return Math.floor(value * activityFactor);
    };

    calcCHOPro = (weight) => {
        console.log(weight);
        let choProtein = {
                        "cho"       : [],
                        "protein"   : []
                    };

        for(let x = 0; x < 6; x++){
            if(x < 5){
                choProtein.cho[x] = weight * (x+4);
            }
            choProtein.protein[x] = Math.round(weight * (1 + (x *.1 + .4)));
        }

        return choProtein;
    };

	componentDidMount() {

		let {gender, age, height, weight, unit, activityLevel, validForm} = this.props.nutritionCalculatorStore;
		age = parseInt(age);
		weight = parseInt(weight);

		if(!validForm) return;
		
        let metrics = unit === 'metrics';

        if(!metrics){
            //convert ft to inches
            let tempHeight = height.split(".");
            let Ft = (tempHeight[1] !== null ? Number(tempHeight[0]) : 0);
            let In = (tempHeight[1] !== null ? Number(tempHeight[1]) : 0);
            //convert standard to metric
            height = (Ft * 12 + In) * 2.54;
            weight = Math.round(weight * 0.453592);
        }else{
            let tempHeight = Number(height);
            height = Math.floor(tempHeight * 100);
        }

        //Get gender
        //True = male
        //False = female
        gender = gender === "Male"

        //calculate benedict Number
        let benedictNum = this.harrisBenedict({age, height, weight}, gender, activityLevel);
        //calculate CHO & Protein
        let choProteins = this.calcCHOPro(weight);

        //show full results
        if(benedictNum != null && choProteins != null){
            let lean = {
            	benedict: benedictNum - 250,
            	cho: choProteins.cho[0] + "-" + choProteins.cho[2],
            	protein: choProteins.protein[1] + "-" + choProteins.protein[4]
            }

            let perfector = {
            	benedict: benedictNum,
            	cho: choProteins.cho[1] + "-" + choProteins.cho[3],
            	protein: choProteins.protein[0] + "-" + choProteins.protein[3]
            }

            let gainer = {
            	benedict: benedictNum + 250,
            	cho: choProteins.cho[2] + "-" + choProteins.cho[4],
            	protein: choProteins.protein[1] + "-" + choProteins.protein[5]
            }

            console.log(lean);
            console.log(perfector);
            console.log(gainer);

            this.setState({
            	lean,
            	perfector,
            	gainer
            })

        }else{
            //Something went wrong
            alert("Sorry something went wrong, please try again. If you get this message again please contact tech support.");
        }
   
	}



	render() {
		const {vaultAccess, nutritionCalculatorStore} = this.props;
		const {lean, perfector, gainer} = this.state;

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
					<Helmet title="Nutrition - Result"/>

					<Menubar
						title="Nutrition Result"
						backButton={true}
						className="gradient-turquoise menu-color-white">
					</Menubar>

					<div className="container">
						<h2 className="text-center">Result</h2>

						{lean && perfector && gainer ? (
							<div>
								<h4>The Lean Machine:</h4>
								<p>{lean.benedict} (Calories)</p>	
								<p>{lean.cho} (GRAMS of Carbohydrates)</p>	
								<p>{lean.protein} (GRAMS of protein)</p>	

								<h4>The Perfector:</h4>
								<p>{perfector.benedict} (Calories)</p>	
								<p>{perfector.cho} (GRAMS of Carbohydrates)</p>	
								<p>{perfector.protein} (GRAMS of protein)</p>

								<h4>The Gainer</h4>
								<p>{gainer.benedict} (Calories)</p>	
								<p>{gainer.cho} (GRAMS of Carbohydrates)</p>	
								<p>{gainer.protein} (GRAMS of protein)</p>
							</div>
						) : undefined}
					</div>	
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

