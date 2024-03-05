import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

export default function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const [passwordStyle, setPasswordStyle] = useState({});
	const [passwordHint, setPasswordHint] = useState("");
	const [isFetching, setIsFetching] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();
		setError(false);
		setIsFetching(true);
		try {
			const response = await axios.post("/api/auth/register", {
				username,
				email,
				password,
			});
			response.data && window.location.replace("/login");
		} catch (err) {
			err.response && setError(err.response.data);
		}
		setIsFetching(false);
	};

	const passwordCheck = password => {
		const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*]).{7,}$/;
		return regex.test(password);
	};

	const handlePasswordChange = e => {
		setPassword(e.target.value);
		if (passwordCheck(e.target.value)) {
			setPasswordStyle({
				boxShadow: "3px 4px 15px -3px rgb(13 215 13)",
				transition: "box-shadow 0.3s ease-in-out",
			});
			setPasswordHint(""); // Clear the password hint when the password is valid
		} else {
			setPasswordStyle({
				boxShadow: "rgb(225 45 45) 3px 4px 15px -3px",
				transition: "box-shadow 0.3s ease-in-out",
			});
			setPasswordHint(
				"* Password must contain at least 7 characters, including numbers, lowercase and uppercase letters, and special characters (!@#$%&*)."
			);
		}
	};

	return (
		<div className="register">
			<h2 className="register__title">Register</h2>
			<form className="register__form" onSubmit={handleSubmit}>
				<label htmlFor="username">Username</label>
				<input
					className="register__input"
					required
					type="text"
					placeholder="Enter your Name"
					onChange={e => setUsername(e.target.value)}
				/>
				<label htmlFor="email">Email</label>
				<input
					className="register__input"
					required
					type="text"
					placeholder="Enter your Email"
					onChange={e => setEmail(e.target.value)}
				/>

				<label htmlFor="password">Password</label>
				<input
					style={passwordStyle}
					className={`register__password `}
					required
					type="password"
					placeholder="Enter your Password"
					onChange={handlePasswordChange}
				/>
				<span className="password__hint">{passwordHint}</span>
				<button
					className="register__button"
					type="submit"
					disabled={isFetching}
				>
					{isFetching ? (
						<div className="spinner-cube">
							<div></div>
							<div></div>
						</div>
					) : (
						"Register"
					)}
				</button>

				<button type="submit" className="login__button">
					<Link className="nav__link nav__link-login" to="/login">
						Login
					</Link>
				</button>
			</form>
		</div>
	);
}
