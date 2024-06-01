import jwt from 'jsonwebtoken'

export const generateToken = staffId => {
	return jwt.sign(
		{
			staffId
		},
		process.env.JWT_SECRET,
		{ expiresIn: '10d' }
	)
}
