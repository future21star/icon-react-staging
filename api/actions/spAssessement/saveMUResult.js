import * as models from "../../models";
import {generalError} from '../../utils/message';
import {saveMU} from "../../../src/redux/modules/spAssessmentStore";

export default function saveMUResult(request) {
	return new Promise(async (resolve, reject) => {

		if(!request.session.user) {
			return resolve({
				mu: null
			});
		}

		// remove previous result
		try {
			await models.mu.destroy({
				where: {
					userId: request.session.user.reactUserId
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}

		// save new result
		try {
			await models.mu.create({
				userId: request.session.user.reactUserId,
				q1: request.body.q1,
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}

		let dbMU = {
			[request.body.evaluation] : {
				q1: request.body.q1
			}
		};

		let newMu = {
			strength: null,
			technique: null,
			flexibility: null,
			...dbMU
		};

		return resolve({
			mu: newMu
		});
	});
}
