import nodemailer from 'nodemailer';
import crypto from 'crypto';

async function mailSender(receiver) {
    const OTP = crypto.randomInt(100000, 1000000); // 6-digit OTP

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>OTP Verification</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <h2 style="color: #333;">Hello!</h2>
        <p style="font-size: 16px;">Your One Time Password (OTP) for admin registration is:</p>
        <h1 style="color: #007bff; font-size: 36px;">${OTP}</h1>
        <p style="font-size: 14px; color: #777;">This OTP is valid for 10 minutes.</p>
        <br/>
        <p style="font-size: 14px;">If you did not request this, please ignore this email.</p>
        <hr style="margin-top: 30px;">
        <p style="font-size: 12px; color: #aaa;">Admin Portal Team</p>
      </div>
    </body>
    </html>
  `;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailOptions = {
        from: `"Admin Portal" <${process.env.MAIL_USER}>`,
        to: receiver,
        subject: 'OTP for Admin Registration',
        html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`OTP Email sent to ${receiver}: ${info.response}`);
        return OTP;
    } catch (error) {
        console.error('Error sending OTP email:', error.message);
        throw new Error('Failed to send OTP. Please try again.');
    }
}

export default mailSender;
