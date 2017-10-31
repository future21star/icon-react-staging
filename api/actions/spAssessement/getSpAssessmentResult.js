import * as models from "../../models";
import {generalError} from '../../utils/message'

export default function getSpAssessmentResult(request) {
	return new Promise(async (resolve, reject) => {
	
		let spAssessmentResult = null;

		try {
			spAssessmentResult = await models.SpAssessment.findAll({
				where: {
					userId: request.session.user.reactUserId
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}

		if(!spAssessmentResult.length) {
			return resolve({
				spAssessmentResult: {
					evaluation: null
				}
			});
		}

		let finalResult = {
			evaluation: spAssessmentResult[0].evaluation,
			[spAssessmentResult[0].evaluation]: {}
		};

		spAssessmentResult.map(data => {
			finalResult[spAssessmentResult[0].evaluation][data.questionSerial] = data;
		});

		return resolve({
			spAssessmentResult: finalResult
		});
	});
}
