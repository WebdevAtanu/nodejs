import { z } from 'zod';

export const adminRegisterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long")
});

export const adminVerifySchema = adminRegisterSchema.extend({
    valid_otp: z.string()
        .min(4, "OTP must be at least 4 digits")
        .max(6, "OTP can't be more than 6 digits")
});

export const adminLoginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long")
});
