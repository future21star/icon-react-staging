import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {isLoaded as isAuthLoaded, load as loadAuth} from './redux/modules/authStore';
import * as containers from './containers';

export default (store) => {
	const requiresAuth = (nextState, replace, cb) => {

		// do not need to log in if single podcast
		if (nextState.params.type && nextState.params.type === 'podcast') {
			cb();
			return;
		}

		// do not need to log in if podcast index
		if (nextState.location.pathname === '/feed/podcast') {
			cb();
			return;
		}

		function checkAuth() {
			const {authStore: {user}} = store.getState();

			// not logged in
			if (!user) {

				// redirect to feed/podcast if guest user visits /feed
				if (nextState.location.pathname === '/feed') {
					replace('/feed/podcast');
					cb();
					return;
				}

				// get intended redirect url
				let redirectTo = nextState.location.pathname;

				// redirect
				if(redirectTo === '/') {
					replace('/login');
				} else {
					replace('/login?redirectTo='+redirectTo);
				}

			}
			cb();
		}

		if (!isAuthLoaded(store.getState())) {
			store.dispatch(loadAuth()).then(checkAuth);
		} else {
			checkAuth();
		}
	};

	const requiresGuest = (nextState, replace, cb) => {
		function checkGuest() {
			const {authStore: {user}} = store.getState();
			if (user) {
				// oops, logged in, so can't be here!
				replace('/');
			}
			cb();
		}

		if (!isAuthLoaded(store.getState())) {
			store.dispatch(loadAuth()).then(checkGuest);
		} else {
			checkGuest();
		}
	};


	return (
		<Route path="/" component={containers.App}>

			{/* only auth user*/}
			<Route onEnter={requiresAuth}>
				{/* only auth user with bottom nav*/}
				<Route component={containers.MasterLayout}>
					<IndexRoute component={containers.Home}/>
					<Route path="welcome" component={containers.Welcome}/>
					<Route path="profile" component={containers.Profile}/>
					<Route path="help" component={containers.Help}/>
					<Route path="support" component={containers.Support}/>
					<Route path="feed" component={containers.Feed}>
						<IndexRoute component={containers.FeedVideo}/>
						<Route path="podcast" component={containers.FeedPodcast}/>
						<Route path="mentality" component={containers.FeedMentality}/>
					</Route>
					<Route path="feed/topic/:id" component={containers.FeedFilteredByTopic}/>
					<Route path="feed/:type/:id" component={containers.FeedSingle}/>
					<Route path="nutrition" component={containers.Nutrition}/>
					<Route path="nutrition/welcome" component={containers.NutritionWelcome}/>
					<Route path="nutrition/foundations" component={containers.NutritionFoundations}/>
					<Route path="nutrition/search" component={containers.NutritionBlogSearch}/>
					<Route path="nutrition/help" component={containers.NutritionHelp}/>
					<Route path="nutrition/meal-plans" component={containers.NutritionMealPlans}/>
					<Route path="nutrition/calculator" component={containers.NutritionCalculator}/>
					<Route path="nutrition/calculator/result" component={containers.NutritionCalculatorResult}/>
					<Route path="nutrition/change-track" component={containers.NutritionChangeTrack}/>
					<Route path="nutrition/foundations" component={containers.NutritionFoundations}/>
					<Route path="nutrition/blog" component={containers.NutritionBlog}>
						<IndexRoute component={containers.NutritionBlogPosts}/>
						<Route path="podcast" component={containers.NutritionBlogPodcast}/>
					</Route>
					<Route path="nutrition/blog/:id" component={containers.NutritionSinglePost}/>
					<Route path="nutrition/philosophy" component={containers.NutritionPhilosophy}/>
					<Route path="nutrition/faqs" component={containers.NutritionFaqs}/>
					<Route path="programming" component={containers.Programming}/>
					<Route path="programming/list-view" component={containers.ProgrammingListView}/>
					<Route path="edit-tracks" component={containers.EditTracks}/>
					<Route path="help/:slug" component={containers.Help}/>
					
					<Route path="faqs" component={containers.FaqsLanding}/>
					<Route path="faqs/:slug" component={containers.FaqSingle}/>


					<Route path="specialty-programs" component={containers.SpecialtyProgramsLanding}/>
					<Route path="specialty-programs/strength" component={containers.SpecialtyProgramsStrength}/>
					<Route path="specialty-programs/technique" component={containers.SpecialtyProgramsTechnique}/>
					<Route path="specialty-programs/assessment" component={containers.SpecialtyProgramsAssessment}/>
					<Route path="specialty-programs/assessment/result" component={containers.SpecialtyProgramsResult}/>
				</Route>

				{/* only auth user without bottom nav*/}
				<Route path="workout/:trackName/:id" component={containers.WorkOutMode}/>
				<Route path="workout/:trackName/:id/comments" component={containers.WorkOutModeComments}/>
				<Route path="edit-profile" component={containers.EditProfile}/>
				<Route path="edit-tracks/:name" component={containers.ViewTrack}/>
				<Route path="feed/filter" component={containers.FeedFilter}/>
				<Route path="feed/search" component={containers.FeedSearch}/>
				<Route path="podcast-player" component={containers.PodcastPlayer}/>
			</Route>

			{/* both auth/guest user with bottom nav */}
			<Route component={containers.MasterLayout}>
				<Route path="assessment" component={containers.AssessmentLanding}/>
				<Route path="assessment/workouts" component={containers.AssessmentWorkouts}/>
				<Route path="assessment/form" component={containers.AssessmentForm}/>
				<Route path="assessment/result" component={containers.AssessmentResult}/>
				<Route path="free-week" component={containers.CategorySelection}/>
				<Route path="free-week/:categoryId" component={containers.CategoryWodView}/>
			</Route>

			{/* only guest user */}
			<Route onEnter={requiresGuest}>
				<Route path="login" component={containers.Login}/>
			</Route>

			{/* 404 */}
			<Route path="*" component={containers.NotFound} status={404}/>
		</Route>
	);
};
