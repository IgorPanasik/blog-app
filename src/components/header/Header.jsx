import "./header.scss";

export default function Header() {
	return (
		<div className="header">
			<div className="header__titles">
				<p className="header__titles-small">React & Node</p>
				<p className="header__titles-large">Blog</p>
			</div>

			<img
				src="./assets/header-background.jpg"
				alt="flower"
				className="header__img"
			/>
		</div>
	);
}
