import * as models from "../../models";
import {generalError} from '../../utils/message'

export default function saveNutritionTrackResult(request) {
	return new Promise(async (resolve, reject) => {
		// remove all results
		try {
			await models.NutritionTracksResult.destroy({
				where: {
					userId: request.session.user.reactUserId
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}

		// add new results

		if(request.body.lean) {
			try {
				await models.NutritionTracksResult.create({
					userId: request.session.user.reactUserId,
					nutritionTrack: 'lean-machine',
					nutritionCalories: request.body.lean.benedict,
					nutritionCarbs: request.body.lean.cho,
					nutritionProtein: request.body.lean.protein
				});
			} catch (e) {
				console.log(e);
				return reject(generalError(e.response));
			}
		}
		if(request.body.perfector) {
			try {
				await models.NutritionTracksResult.create({
					userId: request.session.user.reactUserId,
					nutritionTrack: 'perfector',
					nutritionCalories: request.body.perfector.benedict,
					nutritionCarbs: request.body.perfector.cho,
					nutritionProtein: request.body.perfector.protein
				});
			} catch (e) {
				console.log(e);
				return reject(generalError(e.response));
			}
		}
		if(request.body.gainer) {
			try {
				await models.NutritionTracksResult.create({
					userId: request.session.user.reactUserId,
					nutritionTrack: 'gainer',
					nutritionCalories: request.body.gainer.benedict,
					nutritionCarbs: request.body.gainer.cho,
					nutritionProtein: request.body.gainer.protein
				});
			} catch (e) {
				console.log(e);
				return reject(generalError(e.response));
			}
		}

		// get all results
		let results = null;
		try {
			results = await
				models.NutritionTracksResult.findAll({
					where: {
						userId: request.session.user.reactUserId
					}
				});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}

		return resolve({
			results: results
		});
	});
}
