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
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: "strength",
			bgImgUrl: 'strengthBG.jpg',
			iconUrl: "icon-track-strength",
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			bgImgUrl: 'lifestyleBG.jpg',
			name: "lifestyle",
			iconUrl: "icon-track-lifestyle",
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			bgImgUrl: 'hyperBG.jpg',
			name: "hyper",
			iconUrl: "icon-track-hyper",
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			bgImgUrl: 'hyperBG.jpg',
			name: "masters-35-39",
			iconUrl: "icon-track-hyper",
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			bgImgUrl: 'hyperBG.jpg',
			name: "masters-40-44",
			iconUrl: "icon-track-hyper",
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			bgImgUrl: 'hyperBG.jpg',
			name: "masters-45-49",
			iconUrl: "icon-track-hyper",
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			bgImgUrl: 'hyperBG.jpg',
			name: "masters-50-54",
			iconUrl: "icon-track-hyper",
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			bgImgUrl: 'hyperBG.jpg',
			name: "masters-55-59",
			iconUrl: "icon-track-hyper",
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			bgImgUrl: 'hyperBG.jpg',
			name: "masters-60+",
			iconUrl: "icon-track-hyper",
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
