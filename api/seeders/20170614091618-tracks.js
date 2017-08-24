'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		/*
		 Add altering commands here.
		 Return a promise to correctly handle asynchronicity.

		 Example:
		 return queryInterface.bulkInsert('Person', [{
		 name: 'John Doe',
		 isBetaMember: false
		 }], {});
		 */

		return queryInterface.bulkInsert('tracks', [{
			name: "dynamic",
			bgImgUrl: 'dynamicBG.jpg',
			iconUrl: "icon-track-dynamic",
			details: '<p>Training sessions include multiple portions while still focusing on intensity over volume. For those of you looking for more in depth training, enjoy participating in CrossFit competitions, or want to take things to the next level with your fitness the Dynamic track delivers without overextending you. Many CrossFit enthusiasts use this track to bring themselves to the next level while still having time for life outside the gym.</p>' +
			'<br/><h4>For Those Who:</h4>' +
			'<ol>' +
			'<li>Are looking for more in depth training.</li>' +
			'<li>Enjoy competing in CrossFit competitions, or want to take things to the next level with fitness.</li>' +
			'</ol>',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: "strength",
			bgImgUrl: 'strengthBG.jpg',
			iconUrl: "icon-track-strength",
			details: '<p>Increase your top end strength as well as the ability to cycle heavier barbells more efficiently.  Specific strength cycles are programmed throughout the year while focusing on maintaining GPP through CrossFit.</p>' +
			'<br/><h4>For Those Who:</h4>' +
			'<ol>' +
			'<li>Are looking to focus only on strength.</li>' +
			'<li>Enjoy strength cycles and challenging lifts.</li>' +
			'</ol>',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			bgImgUrl: 'unifyBG.jpg',
			name: "unify",
			iconUrl: "icon-track-unify",
			details: '<p>Seeking for adventure out your door? Warm Up, Workout, Goals for each Session, and Cool Down/Accessory work are always included.</p>' +
			'<p>Sessions last no more than 1 hour so you can put your increased fitness to use outside the confines of the gym. Icon ambassadors that are professionals in other sports or adventure seekers need more time outside of the gym.</p>' +
			'<p>The Unify Track opens doors to better experiences with improved levels of general physical preparedness.</p>' +
			'<br/><h4>For Those Who:</h4>' +
			'<ol>' +
			'<li>Put increased fitness to use outside the confines of the gym.</li>' +
			'<li>Want better experiences with improved levels of general physical preparedness.</li>' +
			'<li>Want increased results while decreasing time at the gym.</li>' +
			'</ol>',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			bgImgUrl: 'hyperBG.jpg',
			name: "hyper",
			iconUrl: "icon-track-hyper",
			details: '<p>For some of us fitness is our sport. Depending on your personal goals the Hyper track provides multiple parts for each training session. Frequent strength, conditioning, gymnastics, and endurance pieces provide the most demanding track. Sessions last 90 min – 3 hours depending on the time of year, cycle of training, and level of athlete. Our Icon ambassadors pursuing the podium at the CrossFit Games or making their first trip there utilize the Hyper programming.</p>' +
			'<br/><h4>For Those Who:</h4>' +
			'<ol>' +
			'<li>Are serious contenders to qualify for Regionals making their first trip to the Games.</li>' +
			'<li>Are pursuing a podium at the CrossFit Games</li>' +
			'</ol>',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			bgImgUrl: 'hyperBG.jpg',
			name: "masters-35-39",
			iconUrl: "icon-track-hyper",
			details: '',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			bgImgUrl: 'hyperBG.jpg',
			name: "masters-40-44",
			iconUrl: "icon-track-hyper",
			details: '',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			bgImgUrl: 'hyperBG.jpg',
			name: "masters-45-49",
			iconUrl: "icon-track-hyper",
			details: '',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			bgImgUrl: 'hyperBG.jpg',
			name: "masters-50-54",
			iconUrl: "icon-track-hyper",
			details: '',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			bgImgUrl: 'hyperBG.jpg',
			name: "masters-55-59",
			iconUrl: "icon-track-hyper",
			details: '',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			bgImgUrl: 'hyperBG.jpg',
			name: "masters-60+",
			iconUrl: "icon-track-hyper",
			details: '',
			createdAt: new Date(),
			updatedAt: new Date()
		}
		], {});
	},

	down: function (queryInterface, Sequelize) {
		/*
		 Add reverting commands here.
		 Return a promise to correctly handle asynchronicity.

		 Example:
		 return queryInterface.bulkDelete('Person', null, {});
		 */

		return queryInterface.bulkDelete('tracks', null, {});
	}
};
