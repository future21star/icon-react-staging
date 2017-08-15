import * as models from "../../models";
import {generalError} from '../../utils/message'
import {WP_API_URL} from "../../config/app";
import axios from "axios";
import _ from "lodash";

export default function saveAssessmentResult(request) {
	return new Promise(async (resolve, reject) => {
	
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
				backSquat: request.body[1],
				fiveK: request.body[2],
				pullingPushing: request.body[3],
				overheadSquat: request.body[4],
				wallballs: request.body[5],
				snatch: request.body[6],
				cleanAndJerk: request.body[7],
				hoursInTheGym: request.body[8],
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
