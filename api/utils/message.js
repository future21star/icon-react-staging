export function generalError(message) {
	return {
		message
	}
}

export function validationError(errors) {
	if (errors && errors.length) {
		let firstError = errors[0];
		if (firstError) {
			return {
				message: firstError.msg
			}
		}
	}
	return {
		message: ''
	}
}

export function successMessage(message) {
	return {
		message
	}
}
