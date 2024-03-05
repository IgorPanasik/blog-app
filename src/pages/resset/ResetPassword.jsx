import { useContext, useRef, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./reset-password.scss";
import { Context } from "../../components/context/Context";

export default function ResetPassword() {
	const passwordRef = useRef();
	const passwordRepeatRef = useRef();
	const [passwordHint, setPasswordHint] = useState("");
	const [passwordStyle, setPasswordStyle] = useState({});
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const { user, dispatch } = useContext(Context);

	const passwordCheck = password => {
		const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*]).{7,}$/;
		return regex.test(password);
	};

	const handlePasswordChange = e => {
		if (
			passwordCheck(passwordRef.current.value) &&
			passwordRef.current.value === passwordRepeatRef.current.value
		) {
			setPasswordStyle({
				boxShadow: "3px 4px 15px -3px rgb(13 215 13)",
				backgroundColor: "rgb(104 237 104)",
				transition: "box-shadow 0.3s ease-in-out",
			});
			setPasswordHint(""); // Clear the password hint when the password is valid
		} else {
			setPasswordStyle({
				boxShadow: "rgb(225 45 45) 3px 4px 15px -3px",
				backgroundColor: "rgb(236, 138, 138)",
				transition: "box-shadow 0.3s ease-in-out",
			});
			setPasswordHint(
				"* Passwords do not match or do not meet the requirements. Password must contain at least 7 characters, including numbers, lowercase and uppercase letters, and special characters (!@#$%&*)."
			);
		}
	};

	const handlePasswordUpdate = async e => {
		e.preventDefault();
		const resetToken = window.location.pathname.split("/")[2]; // Получаем токен сброса из URL
		const updatedUser = {
			password: passwordRef.current.value,
		};
		if (
			passwordRef.current.value !== passwordRepeatRef.current.value ||
			!passwordCheck(passwordRef.current.value)
		) {
			setModalMessage("Passwords do not match or do not meet the requirements");
			setModalIsOpen(true);
			return;
		}
		try {
			const response = await axios.put(
				`/api/users/resetpassword/${resetToken}`,
				updatedUser
			);
			if (response.data) {
				setModalMessage("Password has been updated");
				setModalIsOpen(true);
				window.location.href =
					"https://main--blog-app-panasik-igor.netlify.app/login"; // Перенаправляем пользователя на страницу входа
			} else {
				setModalMessage(
					"An error occurred while trying to update the password"
				);
				setModalIsOpen(true);
			}
		} catch (err) {
			console.error(err);
			setModalMessage("An error occurred while trying to update the password");
			setModalIsOpen(true);
		}
	};

	return (
		<div className="form__password">
			<form
				className="form__password-container"
				onSubmit={handlePasswordUpdate}
			>
				<h2 className="update__password">Update Password</h2>
				<label htmlFor="password">New Password</label>
				<input
					style={passwordStyle}
					id="password"
					className="form__password-input"
					type="password"
					required
					placeholder="New Password"
					ref={passwordRef}
					onChange={handlePasswordChange}
				/>
				<label htmlFor="password-repeat">Repeat Password</label>
				<input
					style={passwordStyle}
					id="password-repeat"
					className="form__password-input"
					type="password"
					required
					placeholder="Repeat New Password"
					ref={passwordRepeatRef}
					onChange={handlePasswordChange}
				/>
				<span className="password__hint">{passwordHint}</span>
				<button className="update__password-btn" type="submit">
					Update Password
				</button>
			</form>
			<Modal
				className="modal__error"
				overlayClassName="modal__error-overlay"
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
			>
				<h2>{modalMessage}</h2>
				<button onClick={() => setModalIsOpen(false)}>Close</button>
			</Modal>
		</div>
	);
}
