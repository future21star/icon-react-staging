// default
let appUrl 		= 'https://react-staging.iconathlete.com';
let wpApiUrl 	= 'https://wp-staging.iconathlete.com/wp-json';


// override on production
if(process.env.NODE_ENV === 'production') {
	appUrl 		= 'https://vault.iconathlete.com';
	wpApiUrl 	= 'https://iconathlete.com/wp-json';
}


// export
export const APP_NAME 	= 'Icon Athlete Vault';
export const APP_URL 	= appUrl;
export const WP_API_URL = wpApiUrl;
