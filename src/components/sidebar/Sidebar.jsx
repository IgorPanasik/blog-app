import "./sidebar.scss";
import "./sidebarMediaQuery.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPinterestP } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import IconProfileDefault from "../topbar/IconProfileDefault";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";

export default function Sidebar() {
	const [cats, setCats] = useState([]);
	const [newCategory, setNewCategory] = useState("");
	const [isAdding, setIsAdding] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [isInputVisible, setInputVisible] = useState(false);
	const [quote, setQuote] = useState("");
	const [author, setAuthor] = useState("");
	const [isLoadingData, setIsLoadingData] = useState(false);
	const [openBar, setOpenBar] = useState(false);

	const { user } = useContext(Context);

	useEffect(() => {
		const getCats = async () => {
			const response = await axios.get("/api/categories");
			setCats(response.data);
		};
		getCats();
	}, []);

	const fetchQuote = async () => {
		try {
			setIsLoadingData(true);
			const category = "happiness";
			const API_KEY = "zJUEKG4SRR6sO8M1Zkbr4A==e6lyixP2TH42QiFA";
			const response = await axios.get(
				`https://api.api-ninjas.com/v1/quotes?category=${category}`,
				{
					headers: { "X-Api-Key": API_KEY },
				}
			);
			setQuote(response.data[0]);
			setAuthor(response.data[0]);
			setIsLoadingData(false);
		} catch (error) {
			console.error("Error fetching quote:", error);
		}
	};

	useEffect(() => {
		fetchQuote();
	}, []);

	const handleAddCategory = async e => {
		e.preventDefault();
		if (isInputVisible) {
			console.log("Submit new category to the database:", newCategory);
			setNewCategory("");
		}
		requestAnimationFrame(() => {
			window.getComputedStyle(e.target).width;
			setTimeout(() => {
				setInputVisible(!isInputVisible);
			}, 50);
		});

		// Проверка на существование категории
		const existingCategory = cats.find(
			cat => cat.name.toLowerCase() === newCategory.toLowerCase()
		);
		if (existingCategory) {
			setShowModal(true);
			setNewCategory("");
			return;
		}

		const formattedCategory =
			newCategory.charAt(0).toUpperCase() + newCategory.slice(1);
		try {
			const response = await axios.post("/api/categories", {
				name: formattedCategory,
			});
			setCats([...cats, response.data]);
			setIsAdding(false);
			setNewCategory("");
		} catch (err) {
			console.error(err);
		}
	};

	const handleClickToggle = () => {
		setOpenBar(prevOpenBar => !prevOpenBar);
	};

	return (
		<div className={`sidebar ${openBar ? "" : "hide"}`}>
			{showModal && (
				<div className="modal">
					<div className="modal-content">
						<h2>Category already exists!</h2>
						<button onClick={() => setShowModal(false)}>OK</button>
					</div>
				</div>
			)}
			{openBar ? (
				<ArrowRight onClick={handleClickToggle} />
			) : (
				<ArrowLeft onClick={handleClickToggle} />
			)}
			<div className={`sidebar__item ${openBar ? "" : "none"}`}>
				<h2 className="sidebar__title">ABOUT ME</h2>

				{user && user.profilePic ? (
					<img
						src={user.profilePic}
						alt="profile"
						className="sidebar__profile-image"
					/>
				) : (
					<IconProfileDefault className="sidebar__profile-icon" />
				)}

				<div className="container__data-quotes">
					<h2 className="quote__day">Quote of Day</h2>
					{isLoadingData ? (
						<div className="spinner-cube">
							<div></div>
							<div></div>
						</div>
					) : (
						<p className="quote">
							{quote.quote}
							<span className="author"> {author.author}</span>
						</p>
					)}
				</div>
			</div>
			<div className="sidebar__item">
				<div className="sidebar__title-container">
					<h2 className="sidebar__title">CATEGORIES</h2>
				</div>
				<ul className="sidebar__list">
					{cats.map(category => {
						return (
							<Link
								className="link"
								key={uuidv4()}
								to={`/?cat=${category.name}`}
							>
								<li className="sidebar__list-item">{category.name}</li>
							</Link>
						);
					})}
				</ul>
				<div className="add__category-container">
					<form className="add__category-new" onSubmit={handleAddCategory}>
						<button title="Add new Category" className="add__category">
							<svg width="25px" height="25px" viewBox="0 0 24 24">
								<circle
									opacity="0.5"
									cx="12"
									cy="12"
									r="10"
									stroke="#1C274C"
									strokeWidth="1.5"
								/>
								<path
									d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
									stroke="#1C274C"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>
						</button>
						{isInputVisible && (
							<input
								autoFocus={true}
								className="write__category "
								type="text"
								value={newCategory}
								onChange={e => setNewCategory(e.target.value)}
								required
								title="Write a category"
							/>
						)}
					</form>
				</div>
			</div>
			<div className="sidebar__item">
				<h2 className="sidebar__title">FOLLOW US</h2>
				<div className="sidebar__social">
					<div className="top__left-sidebar">
						<a
							className="link__sidebar"
							target="_blank"
							href="https://www.facebook.com/"
						>
							<FontAwesomeIcon
								icon={faFacebook}
								className="top__icon facebook"
							/>
						</a>

						<a
							className="link__sidebar"
							target="_blank"
							href="https://twitter.com/i/flow/login"
						>
							<FontAwesomeIcon
								icon={faXTwitter}
								className="top__icon twitter"
							/>
						</a>
						<a
							className="link__sidebar"
							target="_blank"
							href="https://www.pinterest.com/"
						>
							<FontAwesomeIcon
								icon={faPinterestP}
								className="top__icon pinterest"
							/>
						</a>
						<a
							className="link__sidebar"
							target="_blank"
							href="https://www.instagram.com/accounts/login/"
						>
							<FontAwesomeIcon
								icon={faInstagram}
								className="top__icon instagram"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
