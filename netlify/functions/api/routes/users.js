import { Router } from "express";
import User from "../models/User";
import Post from "../models/Post";
import bcrypt from "bcrypt";

const router = Router();

//Update
router.put("/:id", async (req, res) => {
	if (req.body.userId === req.params.id) {
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			req.body.password = await bcrypt.hash(req.body.password, salt);
		}
		try {
			const updateUser = await User.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			res.status(200).json(updateUser);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	} else {
		res.status(401).json("You can update only your account");
	}
});

//Delete
router.delete("/:id", async (req, res) => {
	if (req.body.userId === req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			try {
				await Post.deleteMany({ username: user.username });
				await User.findByIdAndDelete(req.params.id);
				res.status(200).json("User has been deleted...");
			} catch (err) {
				res.status(500).json({ error: err.message });
			}
		} catch (err) {
			res.status(404).json("User not found");
		}
	} else {
		res.status(401).json("You can delete only your account");
	}
});

//GET USER
router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, ...others } = user._doc;
		res.status(200).json(others);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Update Password
router.put("/resetpassword/:token", async (req, res) => {
	try {
		// Найдите пользователя по токену сброса пароля
		const user = await User.findOne({ resetToken: req.params.token });

		if (!user) return res.status(400).json("Invalid password reset token");

		// Проверьте, не истек ли токен сброса пароля
		if (Date.now() > user.resetTokenExpiration)
			return res.status(400).json("Password reset token has expired");

		// Хешируйте новый пароль и сохраните его в базе данных
		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(req.body.password, salt);
		user.password = hashedPass;
		user.resetToken = undefined;
		user.resetTokenExpiration = undefined;
		await user.save();

		res.status(200).json("Password has been updated");
	} catch (err) {
		res.status(500).json(err);
	}
});

export default router;
