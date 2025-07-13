import bcrypt from 'bcrypt';
import { admin } from '../models/admin.model.js';
import { adminCookie } from '../utils/cookies.js';
import mailSender from '../services/mail.service.js';

import {
	adminRegisterSchema,
	adminVerifySchema,
	adminLoginSchema
} from '../validators/admin.validator.js';

let Store = {};

// ============================ Admin Register ============================
export const adminRegister = async (req, res) => {
	const parsed = adminRegisterSchema.safeParse(req.body);
	if (!parsed.success) {
		return res.status(400).json({ errors: parsed.error.errors });
	}

	const { name, email, password } = parsed.data;
	const image = req.file?.filename;

	try {
		const existingAdmin = await admin.findOne({ email });
		if (existingAdmin) {
			return res.status(400).json({ message: 'Admin already exists' });
		}

		const otp = await mailSender(email); // Send OTP
		Store[email] = { otp, image, name, password };

		return res.status(200).json({ message: 'OTP sent to email' });
	} catch (error) {
		console.error('Admin Register Error:', error);
		return res.status(500).json({ message: 'Server error' });
	}
};

// ============================ Admin Verify ============================
export const adminVerify = async (req, res) => {
	const parsed = adminVerifySchema.safeParse(req.body);
	if (!parsed.success) {
		return res.status(400).json({ errors: parsed.error.errors });
	}

	const { name, email, password, valid_otp } = parsed.data;
	const stored = Store[email];

	if (!stored || stored.otp !== valid_otp) {
		return res.status(400).json({ message: 'Invalid or expired OTP' });
	}

	try {
		const passwordHash = await bcrypt.hash(password, 10);
		const newAdmin = await admin.create({
			name,
			email,
			password: passwordHash,
			image: stored.image || ''
		});

		delete Store[email]; 

		adminCookie(process.env.JWT_SECRET, newAdmin, res, `Admin ${newAdmin.name} registered and logged in`);
	} catch (error) {
		console.error('Admin Verify Error:', error);
		return res.status(500).json({ message: 'Server error', error: error.message });
	}
};

// ============================ Admin Login ============================
export const adminLogin = async (req, res) => {
	const parsed = adminLoginSchema.safeParse(req.body);
	if (!parsed.success) {
		return res.status(400).json({ errors: parsed.error.errors });
	}

	const { email, password } = parsed.data;

	try {
		const findAdmin = await admin.findOne({ email });
		if (!findAdmin) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const isMatch = await bcrypt.compare(password, findAdmin.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		adminCookie(process.env.JWT_SECRET, findAdmin, res, `Admin ${findAdmin.name} logged in`);
	} catch (error) {
		console.error('Admin Login Error:', error);
		return res.status(500).json({ message: 'Server error' });
	}
};

// ============================ Admin Details ============================
export const adminDetails = (req, res) => {
	const { name, email, image } = req.admin_details;
	const fullImagePath = `${process.env.BASE_URL}/uploads/${image}`;
	return res.status(200).json({ name, email, image: fullImagePath });
};

// ============================ Admin Update ============================
export const adminUpdate = async (req, res) => {
	try {
		const adminId = req.admin_details._id;
		const { name, password } = req.body;
		const image = req.file?.filename;

		const updateData = {};
		if (name) updateData.name = name;
		if (image) updateData.image = image;
		if (password) {
			const hashed = await bcrypt.hash(password, 10);
			updateData.password = hashed;
		}

		const updatedAdmin = await admin.findByIdAndUpdate(adminId, updateData, {
			new: true,
			runValidators: true,
		}).select('-password');

		res.status(200).json({
			message: 'Admin profile updated successfully',
			admin: updatedAdmin
		});
	} catch (error) {
		console.error('Update Error:', error.message);
		res.status(500).json({ message: 'Server error' });
	}
};

// ============================ Admin Delete ============================
export const adminDelete = async (req, res) => {
	try {
		const adminId = req.admin_details._id;

		await admin.findByIdAndDelete(adminId);

		res.status(200)
			.clearCookie('admin_token', {
				httpOnly: true,
				secure: true,
				sameSite: 'strict'
			})
			.json({ message: 'Admin account deleted successfully' });
	} catch (error) {
		console.error('Delete Error:', error.message);
		res.status(500).json({ message: 'Server error' });
	}
};

// ============================ Admin Logout ============================
export const adminLogout = (req, res) => {
	return res
		.status(200)
		.cookie('admin_token', '', {
			expires: new Date(0),
			httpOnly: true,
			secure: true,
			sameSite: 'strict'
		})
		.json({ message: 'Admin logged out' });
};
