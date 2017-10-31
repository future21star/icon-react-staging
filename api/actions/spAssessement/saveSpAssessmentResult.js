import * as models from "../../models";
import {generalError} from '../../utils/message'

const q1Questions = {
	strength: 'How many strict pull-ups can you complete?',
	technique: 'Please select your False Grip ability:',
	flexibility: 'Please select your current Shoulder position when performing a ring dip:'
};

const q2Questions = {
	strength: 'How many strict dips can you complete?',
	technique: 'Please select your False Grip ability:',
	flexibility: 'Please select the movement of the rings during transition'
};

const q1Answers = {
	strength: {
		'1': "0 strict pull-ups",
		'3': "2 strict pull-ups",
		'5': "5 strict pull-ups",
		'10': "12 strict pull-ups"
	},
	technique: {
		'1': "Not able to use false grip on low rings.",
		'5': "Can apply false grip low rings, not high rings.",
		'10': "False grip pull up while hanging on high rings."
	},
	flexibility: {
		'1': "Shoulder remains above elbow at bottom of ring dip hold.",
		'5': "Shoulder at parallel in bottom of dip position.",
		'10': "Shoulder below elbow ring dip hang."
	}
};

const q2Answers = {
	strength: {
		'1': "0 strict dips",
		'3': "2 strict dips",
		'5': "5 strict dips",
		'10': "12 strict dips"
	},
	technique: {
		'1': "Rings pull to the armpits instead of the sternum and athlete skips steps during transition on low rings.",
		'5': "Transition rings to sternum low feet under rings, rings go to armpits feet extended in front of the body.",
		'10': "Athlete can successfully perform an l-sit transition on low rings while rings pull to sternum and trace the bottom pecs."
	},
	flexibility: {
		'1': "Rings cannot come to sternum with feet supporting on low rings.",
		'5': "Rings trace nipple line in transition.",
		'10': "Rings trace under pecs through transition."
	}
};

export default function saveSpAssessmentResult(request) {
	return new Promise(async (resolve, reject) => {

		if(!request.session.user) {
			return resolve({
				spAssessmentResult: null
			});
		}

		// remove previous result
		try {
			await models.SpAssessment.destroy({
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
			await models.SpAssessment.bulkCreate([{
				userId: request.session.user.reactUserId,
				evaluation: request.body.evaluation,
				questionSerial: 'q1',
				questionText: q1Questions[request.body.evaluation],
				answerValue: request.body.q1,
				answerText: q1Answers[request.body.evaluation][request.body.q1]
			}, {
				userId: request.session.user.reactUserId,
				evaluation: request.body.evaluation,
				questionSerial: 'q2',
				questionText: q2Questions[request.body.evaluation],
				answerValue: request.body.q2,
				answerText: q2Answers[request.body.evaluation][request.body.q2]
			}]);
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}

		// fetch the result and response
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
