import * as models from "../../models";
import {generalError} from '../../utils/message'
import {WP_API_URL} from "../../config/app";
import axios from "axios";
import _ from "lodash";

export default function saveAssessmentResult(request) {
	return new Promise(async (resolve, reject) => {

		if(!request.session.user) {
			return resolve({
				assessment: null
			});
		}
	
		// remove previous result
		try {
			await models.Assessment.destroy({
				where: {
					userId: request.session.user.reactUserId
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}

		// save new result
		let assessment = null;
		try {
			assessment = await models.Assessment.create({
				userId: request.session.user.reactUserId,
				gender: request.body[0],
				backSquat: request.body[2],
				fiveK: request.body[3],
				pullingPushing: request.body[4],
				overheadSquat: request.body[5],
				wallballs: request.body[6],
				snatch: request.body[7],
				cleanAndJerk: request.body[8],
				hoursInTheGym: request.body[9],
				totalScore: request.body.totalScore,
				recommandedTrack: request.body.recommendedTrack
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}
		

		return resolve({
			assessment: assessment
		});
	});
}
