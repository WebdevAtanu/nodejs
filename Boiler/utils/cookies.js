import jwt from 'jsonwebtoken';

export const adminCookie = (jwt_secret, admin, res, message) => {
    const admin_token = jwt.sign(
        { id: admin._id },
        jwt_secret,
        { expiresIn: '1d' }
    );

    res.status(201)
        .cookie('admin_token', admin_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000
        })
        .json({
            status: true,
            message,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                image: admin.image
            }
        });
};
