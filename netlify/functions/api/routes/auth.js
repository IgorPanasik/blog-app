import { Router } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import crypto from "crypto"; // Для генерации случайного токена
import nodemailer from "nodemailer"; // Для отправки электронных писем
import dotenv from "dotenv";
dotenv.config();

const router = Router();

//Register
const passwordCheck = password => {
	const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*]).{7,}$/;
	return regex.test(password);
};

router.post("/register", async (req, res) => {
	try {
		// Проверка на существование пользователя с таким именем

		const existingUser = await User.findOne({ username: req.body.username });
		if (existingUser) {
			return res.status(400).json("A user with this name already exists");
		}
		// Проверка на существование пользователя с такой почтой

		const existingEmail = await User.findOne({ email: req.body.email });
		if (existingEmail) {
			return res.status(400).json("A user with such an email already exists");
		}

		// Проверка пароля
		if (!passwordCheck(req.body.password)) {
			return res.status(400).json("Password does not meet the requirements");
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(req.body.password, salt);
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPass,
		});

		const user = await newUser.save();
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({
			error: "An error occurred during registration. Please try again later",
		});
	}
});

//Login
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) return res.status(400).json("Incorrect Username or Password");

		const validated = await bcrypt.compare(req.body.password, user.password);
		if (!validated)
			return res.status(400).json("Incorrect Username or Password");

		const { password, ...others } = user._doc;
		res.status(200).json(others);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Reset Password
// Password reset request
router.post("/resetpassword", async (req, res) => {
	try {
		// Сначала найдите пользователя по имени
		const user = await User.findOne({ username: req.body.username });

		if (!user)
			return res.status(400).json("User with this username does not exist");

		// Генерация случайного токена
		const resetToken = crypto.randomBytes(32).toString("hex");

		// Сохранение токена и срока его действия в базе данных

		user.resetToken = resetToken;
		user.resetTokenExpiration = Date.now() + 3600000; // Токен действителен в течение одного часа
		await user.save();

		// Отправка ссылки для сброса пароля пользователю по электронной почте
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const resetUrl = `https://main--blog-app-panasik-igor.netlify.app/resetpassword/${resetToken}`;

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: user.email,
			subject: "Password Reset",
			text: `You requested a password reset. Click the link below to choose a new password:\n\n${resetUrl}\n\nIf you did not request a password reset, ignore this email.`,
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent: " + info.response);
			}
		});
		res.status(200).json("A password reset link has been sent to your email");
	} catch (err) {
		res.status(500).json(err);
	}
});

export default router;
