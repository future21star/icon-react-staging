import {generalError} from '../../utils/message'
import {WP_API_URL} from "../../config/app";
import axios from "axios";

export default function loadFreeWeekCategories(request) {
	return new Promise(async (resolve, reject) => {

		////////////////////////////////////
		// get all categories of free week
		////////////////////////////////////
		let categories = null;
		try {
			categories = await axios.get(WP_API_URL + '/wp/v2/categories?parent=52&per_page=100');
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		let formattedCategories = [];

		categories.data.map(category => {
			let categoryBgImgUrl = 'dynamicBG.jpg';
			let categoryIconUrl = 'icon-track-dynamic';
			if (category.id === 55) { // dynamic
				categoryBgImgUrl = 'dynamicBG.jpg';
				categoryIconUrl = 'icon-track-dynamic';
			} else if (category.id === 56) { // hyper
				categoryBgImgUrl = 'hyperBG.jpg';
				categoryIconUrl = 'icon-track-hyper';
			} else if (category.id === 57) { // masters
				categoryBgImgUrl = 'hyperBG.jpg';
				categoryIconUrl = 'icon-track-hyper';
			} else if (category.id === 54) { // strength
				categoryBgImgUrl = 'strengthBG.jpg';
				categoryIconUrl = 'icon-track-strength';
			} else if (category.id === 53) { // unify
				categoryBgImgUrl = 'unifyBG.jpg';
				categoryIconUrl = 'icon-track-unify';
			}

			formattedCategories.push({
				id: category.id,
				name: category.name,
				slug: category.slug,
				count: category.count,
				bgImgUrl: categoryBgImgUrl,
				iconUrl: categoryIconUrl
			});
		});

		return resolve({
			categories: formattedCategories
		});
	});
}
