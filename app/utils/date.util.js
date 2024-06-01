export const parseDate = dateString => {
	const [day, month, year] = dateString.split('.').map(Number)
	const date = new Date(year, month - 1, day)

	if (isNaN(date.getTime())) {
		throw new Error('Invalid date')
	}

	return date
}
