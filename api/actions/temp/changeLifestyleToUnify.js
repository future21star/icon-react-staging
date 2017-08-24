import * as models from "../../models";
import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError, successMessage} from "../../utils/message";

export default function changeLifestyleToUnify(request) {
	return new Promise(async (resolve, reject) => {

		// assessments table
		try {
			await models.Assessment.update(
				{
					recommandedTrack: 'unify'
				},
				{
					where: {
						recommandedTrack: 'lifestyle'
					}
				}
			);

		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}


		// tracks table
		try {
			await models.Track.update(
				{
					name: 'unify',
					bgImgUrl: 'unifyBG.jpg',
					iconUrl: 'icon-track-unify',
					details: '<p>Seeking for adventure out your door? Warm Up, Workout, Goals for each Session, and Cool Down/Accessory work are always included.</p>' +
							'<p>Sessions last no more than 1 hour so you can put your increased fitness to use outside the confines of the gym. Icon ambassadors that are professionals in other sports or adventure seekers need more time outside of the gym.</p>' +
							'<p>The Unify Track opens doors to better experiences with improved levels of general physical preparedness.</p>' +
							'<br/><h4>For Those Who:</h4>' +
							'<ol>' +
							'<li>Put increased fitness to use outside the confines of the gym.</li>' +
							'<li>Want better experiences with improved levels of general physical preparedness.</li>' +
							'<li>Want increased results while decreasing time at the gym.</li>' +
							'</ol>'
				},
				{
					where: {
						name: 'lifestyle'
					}
				}
			);

		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}


		// usertracks table
		try {
			await models.UserTrack.update(
				{
					trackName: 'unify'
				},
				{
					where: {
						trackName: 'lifestyle'
					}
				}
			);

		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}


		// wods table
		try {
			await models.Wod.update(
				{
					trackName: 'unify'
				},
				{
					where: {
						trackName: 'lifestyle'
					}
				}
			);

		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}

		return resolve(successMessage('all lifestyle changed to unify!'));
	});
}