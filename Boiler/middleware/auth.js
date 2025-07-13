import { admin } from '../models/admin.model.js';
import jwt from 'jsonwebtoken';

export const adminAuth = async (req, res, next) => {
	try {
		const { admin_token } = req.cookies;

		if (!admin_token) {
			return res.status(401).json({ message: 'Authentication token not found' });
		}

		let tokenDecoded;
		try {
			tokenDecoded = jwt.verify(admin_token, process.env.JWT_SECRET);
		} catch (err) {
			return res.status(401).json({ message: 'Invalid or expired token' });
		}

		const adminUser = await admin.findById(tokenDecoded.id).select('-password');

		if (!adminUser) {
			return res.status(404).json({ message: 'Admin not found' });
		}

		req.admin_details = adminUser;
		next();

	} catch (error) {
		console.error('Admin Auth Error:', error.message);
		return res.status(500).json({ message: 'Internal server error' });
	}
};
