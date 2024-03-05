import "./settings.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import UserIcon from "./UserIcon";
import { useContext, useState } from "react";
import { Context } from "../../components/context/Context";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import IconProfileDefault from "../../components/topbar/IconProfileDefault";
import Modal from "react-modal";

export default function Settings() {
	const [file, setFile] = useState(null);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState(false);
	const [passwordStyle, setPasswordStyle] = useState({});
	const [passwordHint, setPasswordHint] = useState("");
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const { user, dispatch } = useContext(Context);

	const handleSubmit = async e => {
		e.preventDefault();
		dispatch({ type: "UPDATE_START" });

		const updatedUser = {
			userId: user._id,
			username: username || undefined,
			email: email || undefined,
			password: password || undefined,
		};

		if (file) {
			const data = new FormData();
			const filename = uuidv4() + file.name;

			data.append("name", filename);
			data.append("file", file);
			console.log(file);

			try {
				const response = await axios.post("/api/upload", data);
				updatedUser.profilePic = response.data.downloadURL;
			} catch (err) {
				console.error(err);
			}
		} else if (!user.profilePic) {
			return <IconProfileDefault />;
		}

		try {
			const res = await axios.put("/api/users/" + user._id, updatedUser);
			setSuccess(true);
			dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
			setTimeout(() => setSuccess(false), 5000);
		} catch (err) {
			dispatch({ type: "UPDATE_FAILURE" });
		}
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

	const handleDelete = async () => {
		if (showDeleteModal) {
			try {
				await axios.delete(`/api/users/${user._id}`, {
					data: { userId: user._id },
				});
				dispatch({ type: "LOGOUT" });
				window.location.replace("/register");
			} catch (err) {}
		}
	};

	return (
		<div className="settings">
			{showDeleteModal && (
				<Modal
					id="settings"
					overlayClassName="customOverlay"
					className="customModal"
					isOpen={showDeleteModal}
					onRequestClose={() => setShowDeleteModal(false)}
					contentLabel="Delete Account Modal"
				>
					<h2>Are you sure you want to delete your account?</h2>
					<button onClick={handleDelete}>Yes</button>
					<button onClick={() => setShowDeleteModal(false)}>No</button>
				</Modal>
			)}
			<div className="settings__wrapper">
				<div className="settings__title">
					<h2 className="settings__update-title">Update Your Account</h2>
					<h2
						onClick={() => setShowDeleteModal(true)}
						className="settings__delete-title"
					>
						Delete Your Account
					</h2>
				</div>
				<form className="settings__form" onSubmit={handleSubmit}>
					<label className="profile__picture">Profile Picture</label>
					<div className="settings__PP">
						{file ? (
							<img src={URL.createObjectURL(file)} alt="profile image" />
						) : user.profilePic ? (
							<img src={user.profilePic} alt="profile image" />
						) : (
							<IconProfileDefault />
						)}

						<label htmlFor="file__input" title="Change Image">
							<UserIcon />
						</label>
						<input
							type="file"
							id="file__input"
							style={{ display: "none" }}
							onChange={e => setFile(e.target.files[0])}
						/>
					</div>

					<label htmlFor="username">Username</label>
					<input
						type="text"
						placeholder={user.username}
						id="username"
						onChange={e => setUsername(e.target.value)}
					/>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						placeholder={user.email}
						onChange={e => setEmail(e.target.value)}
					/>
					<label htmlFor="password">Password</label>
					<input
						style={passwordStyle}
						id="password"
						type="password"
						placeholder="Password"
						onChange={e => {
							setPassword(e.target.value);
							handlePasswordChange(e);
						}}
					/>
					<span className="password__hint">{passwordHint}</span>
					<button type="submit" className="settings__submit">
						Update
					</button>
					{success && (
						<span className="settings__notification">
							Profile has been updated{" "}
							<svg width="25px" height="25px" viewBox="0 0 24 24" fill="none">
								<circle
									opacity="0.5"
									cx="12"
									cy="12"
									r="10"
									stroke="#178b17"
									strokeWidth="1"
								/>
								<path
									d="M8.5 12.5L10.5 14.5L15.5 9.5"
									stroke="#15a315"
									strokeWidth="4"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</span>
					)}
				</form>
			</div>
			<Sidebar />
		</div>
	);
}
