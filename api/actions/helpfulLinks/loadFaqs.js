import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";
import {includes} from 'lodash';

export default function loadFaqs(request) {
	return new Promise(async (resolve, reject) => {

		// load FAQ categories
		// http://54.148.236.111/wp-json/wp/v2/categories?parent=10

		// get faq categories
		let faqCategories = null;
		try {
			faqCategories = await axios.get(WP_API_URL + '/wp/v2/categories?parent=10');
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		// get category ids
		let categoryIds = [];

		faqCategories.data.map(faqCategory => {
			categoryIds.push(faqCategory.id);
		});


		// get faqs
		let faqs = null;
		try {
			faqs = await axios.get(WP_API_URL + '/wp/v2/faq?per_page=100&categories='+categoryIds.join(','));
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		// format
		let finalFaqs = [];
		faqCategories.data.map(faqCategory => {
			let row = faqCategory;
			row.faqs = [];
			faqs.data.map(faq => {
				if(includes(faq.categories, faqCategory.id))
					row.faqs.push(faq);
			});

			finalFaqs.push(row);
		});
	

		return resolve({
			faqs: finalFaqs
		});
	});
}