import "./contact.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";

export default function Contact() {
	const [name, setName] = useState("");
	const [topic, setTopic] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await axios.post("/api/send/send-email", {
				name,
				topic,
				message,
				email,
			});
			setModalIsOpen(true);
			setName("");
			setTopic("");
			setEmail("");
			setMessage("");
		} catch (error) {
			console.error(error);
			setErrorModalIsOpen(true);
		}
	};

	return (
		<div className="contact">
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				contentLabel="Email Sent Modal"
				overlayClassName="customOverlay"
				className="customModal"
			>
				<h2>Email sent successfully!</h2>
				<button onClick={() => setModalIsOpen(false)}>Close</button>
			</Modal>

			<Modal
				isOpen={errorModalIsOpen}
				onRequestClose={() => setErrorModalIsOpen(false)}
				contentLabel="Email Error Modal"
				overlayClassName="customOverlay"
				className="customModal"
			>
				<h2>An error occurred while sending the email.</h2>
				<button onClick={() => setErrorModalIsOpen(false)}>Close</button>
			</Modal>
			<h2>Contact With Me</h2>

			<div className="form__group">
				<form className="form" onSubmit={handleSubmit}>
					<label htmlFor="username">Your Name</label>
					<input
						type="text"
						required
						id="username"
						className="input"
						placeholder="Your Name"
						value={name}
						onChange={e => setName(e.target.value)}
					/>

					<label htmlFor="email">Your E-mail</label>
					<input
						type="email"
						required
						id="email"
						className="input"
						placeholder="Your E-mail"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>

					<label htmlFor="topic">Topic</label>
					<input
						type="text"
						required
						id="topic"
						className="input"
						placeholder="Topic"
						value={topic}
						onChange={e => setTopic(e.target.value)}
					/>

					<textarea
						placeholder="Write me a message"
						value={message}
						onChange={e => setMessage(e.target.value)}
					></textarea>

					<button className="submit">Send</button>
				</form>
			</div>

			<div className="contact__social-link">
				<ul className="social__list">
					<li className="social__list-item">
						<a target="_blank" href="https://vk.com/id721831049">
							<img
								src="./assets/social-link/vk-v2-svgrepo-com.svg"
								alt="VKontakte logo"
							/>
							VKotakte
						</a>
					</li>

					<li className="social__list-item">
						<a
							target="_blank"
							href="https://discord.com/channels/@_themanwholaughs"
						>
							<img
								src="./assets/social-link/discord-v2-svgrepo-com.svg"
								alt="Discord logo"
							/>
							Discord
						</a>
					</li>
					<li className="social__list-item">
						<a target="_blank" href="https://t.me/The_ManWhoLaughs">
							<img
								src="./assets/social-link/telegram-svgrepo-com.svg"
								alt="Telegram logo"
							/>
							Telegram
						</a>
					</li>

					<li className="social__list-item">
						<a
							target="_blank"
							href="https://www.linkedin.com/in/%D0%B8%D0%B3%D0%BE%D1%80%D1%8C-%D0%BF%D0%B0%D0%BD%D0%B0%D1%81%D0%B8%D0%BA-351174252/"
						>
							<img
								src="./assets/social-link/linkedin-svgrepo-com.svg"
								alt="Linkedin logo"
							/>
							Linkedin
						</a>
					</li>
					<li className="social__list-item">
						<a target="_blank" href="https://github.com/IgorPanasik">
							<img
								src="./assets/social-link/github-svgrepo-com.svg"
								alt="Git hub logo"
							/>
							GitHub
						</a>
					</li>

					<li className="social__list-item">
						<a target="_blank" href="mailto:https://mail.yandex.by/">
							<img
								src="./assets/social-link/mail-svgrepo-com.svg"
								alt="Mail logo"
							/>
							bgt.igor.plav@yandex.by
						</a>
					</li>

					<li className="social__list-item">
						<a target="_blank" href="mailto:https://mail.google.com/">
							<img
								src="./assets/social-link/mail-svgrepo-com.svg"
								alt="Mail logo"
							/>
							panasik.igor.com@gmail.com
						</a>
					</li>

					<li className="social__list-item">
						<a target="_blank" href="tel:+375298816824">
							<img
								src="./assets/social-link/phone-svgrepo-com.svg"
								alt="Phone logo"
							/>
							<img
								src="./assets/social-link/flag-for-flag-belarus-svgrepo-com.svg"
								alt="Flag Republic Of Belarus"
							/>
							+375298816824
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
