import * as models from "../../models";
import {generalError} from '../../utils/message'
import {WP_API_URL} from "../../config/app";
import axios from "axios";
import _ from "lodash";

export default function getAssessmentCategories(request) {
	return new Promise(async (resolve, reject) => {
	
		let assessmentCategories = null;
		try {
			assessmentCategories = await axios.get(WP_API_URL + '/wp/v2/assessment_category');
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		let orderedCategories = [];


		orderedCategories.push(assessmentCategories.data[1]); //1
		orderedCategories.push(assessmentCategories.data[2]); //2
		orderedCategories.push(assessmentCategories.data[0]); //3
		orderedCategories.push(assessmentCategories.data[4]); //4
		orderedCategories.push(assessmentCategories.data[5]); //5
		orderedCategories.push(assessmentCategories.data[3]); //6

		return resolve({
			assessmentCategories: orderedCategories
		});
	});
}
