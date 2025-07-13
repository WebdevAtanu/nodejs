import express from 'express';
import {
  adminRegister,
  adminVerify,
  adminLogin,
  adminDetails,
  adminLogout,
  adminUpdate,
  adminDelete
} from '../controllers/admin.controller.js';
import { adminAuth } from '../middleware/auth.js';
import upload from '../middleware/multer.middleware.js';

const admin_route = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin authentication and profile routes
 */

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Register a new admin with image and OTP verification
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, email, password, image]
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: OTP sent to email
 *       400:
 *         description: Admin already exists or invalid data
 */
admin_route.post('/register', upload.single('image'), adminRegister);

/**
 * @swagger
 * /admin/verify:
 *   post:
 *     summary: Verify OTP and complete admin registration
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, valid_otp]
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@gmail.com
 *               valid_otp:
 *                 type: integer
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Admin created and logged in
 *       400:
 *         description: Invalid OTP or missing data
 */
admin_route.post('/verify', adminVerify);

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Login as admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
admin_route.post('/login', adminLogin);

/**
 * @swagger
 * /admin/details:
 *   get:
 *     summary: Get admin profile details
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Admin details fetched successfully
 *       401:
 *         description: Unauthorized access
 */
admin_route.get('/details', adminAuth, adminDetails);

/**
 * @swagger
 * /admin/logout:
 *   get:
 *     summary: Logout admin and clear session
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Admin logged out
 */
admin_route.get('/logout', adminAuth, adminLogout);

/**
 * @swagger
 * /admin/update:
 *   put:
 *     summary: Update admin profile
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Updated
 *               password:
 *                 type: string
 *                 example: newpassword123
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Admin profile updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
admin_route.put('/update', adminAuth, upload.single('image'), adminUpdate);

/**
 * @swagger
 * /admin/delete:
 *   delete:
 *     summary: Delete admin account
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Admin account deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
admin_route.delete('/delete', adminAuth, adminDelete);

export default admin_route;
