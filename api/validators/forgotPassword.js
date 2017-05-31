export default  {
	'email': {
		notEmpty: true,
		errorMessage: 'Email address is required',
		isEmail: {
			errorMessage: 'Invalid email address'
		}
	}
}
