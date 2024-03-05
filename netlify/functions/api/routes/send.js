import { Router } from "express";
import User from "../models/User";
import nodemailer from "nodemailer"; // Для отправки электронных писем
import dotenv from "dotenv";
dotenv.config();

const router = Router();

//Send email
router.post("/send-email", (req, res) => {
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	let mailOptions = {
		to: process.env.EMAIL_USER,
		subject: req.body.topic,
		text: `Message from User: ${req.body.name}, User E-mail: ${req.body.email}, Message-text: ${req.body.message}`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			res.status(500).send(error);
		} else {
			console.log("Email sent: " + info.response);
			res.status(200).send("Email sent successfully");
		}
	});
});

export default router;
