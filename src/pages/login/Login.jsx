import { Link } from "react-router-dom";
import "./login.scss";
import { useContext, useRef, useState } from "react";
import { Context } from "../../components/context/Context";
import axios from "axios";
import Modal from "react-modal";

export default function Login() {
	const userRef = useRef();
	const passwordRef = useRef();
	const { user, dispatch, isFetching } = useContext(Context);
	const [error, setError] = useState("");
	const [inputStyle, setInputStyle] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		dispatch({ type: "LOGIN_START" });

		try {
			const response = await axios.post("/api/auth/login", {
				username: userRef.current.value,
				password: passwordRef.current.value,
			});
			dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
			setInputStyle({});
		} catch (err) {
			dispatch({ type: "LOGIN_FAILURE" });
			if (err.response && err.response.data) {
				setError(err.response.data);
				setInputStyle({ backgroundColor: "rgba(255, 0, 0, 0.1)" });
			}
		}
	};

	const handlePasswordReset = async e => {
		e.preventDefault();
		try {
			const response = await axios.post("/api/auth/resetpassword", {
				username: userRef.current.value,
			});
			setModalMessage("A password reset link has been sent to your email");
			setIsModalOpen(true);
		} catch (err) {
			console.error(err);
			setModalMessage(
				"An error occurred while trying to send a password reset link"
			);
			setIsModalOpen(true);
		}
	};

	return (
		<div className="login">
			<h2 className="login__title">Login</h2>
			<form className="login__form" onSubmit={handleSubmit}>
				<label htmlFor="email">First Name</label>
				<input
					id="email"
					style={inputStyle}
					className="login__input"
					required
					type="text"
					placeholder="Enter your first name"
					ref={userRef}
				/>

				<label htmlFor="password">Password</label>
				<input
					id="password"
					style={inputStyle}
					className="login__password"
					type="password"
					placeholder="Enter your password"
					ref={passwordRef}
				/>
				<button className="login__button" type="submit" disabled={isFetching}>
					Login
				</button>

				<a
					title="The link to reset password"
					className="link reset__link"
					href="#"
					onClick={handlePasswordReset}
				>
					Lost Password?
					<svg
						width="25px"
						height="25px"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							opacity="0.5"
							d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
							fill="#1C274C"
						/>
						<path
							d="M12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75Z"
							fill="#1C274C"
						/>
						<path
							d="M12 7C12.5523 7 13 7.44771 13 8C13 8.55229 12.5523 9 12 9C11.4477 9 11 8.55229 11 8C11 7.44771 11.4477 7 12 7Z"
							fill="#1C274C"
						/>
					</svg>
				</a>
				<Modal
					isOpen={isModalOpen}
					onRequestClose={closeModal}
					contentLabel="Notification"
					overlayClassName="customOverlay"
					className="customModal"
				>
					<h2>{modalMessage}</h2>
					<button onClick={closeModal}>Close</button>
				</Modal>
				{error && <span className="error-message">{error}</span>}
				<button className="register__button">
					<Link className="nav__link nav__link-register" to="/register">
						Register
					</Link>
				</button>
			</form>
		</div>
	);
}
