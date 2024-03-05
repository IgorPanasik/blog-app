import "./topbar.scss";
import "./topbarMedia-Query.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPinterestP } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import SearchIcon from "./SearchIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import { useContext, useState, useEffect, useRef } from "react";
import IconProfileDefault from "./IconProfileDefault";
import axios from "axios";
import LogoutIcon from "./LogoutIcon";
import HouseIcon from "./HouseIcon";
import AboutIcon from "./AboutIcon";
import ContactIcon from "./ContactIcon";
import WriteIcon from "./WriteIcon";

export default function TopBar() {
	const [posts, setPosts] = useState([]);
	const { user, dispatch } = useContext(Context);
	const [visibleSearch, setVisibleSearch] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	const buttonRef = useRef();
	const inputRef = useRef();
	const node = useRef();
	const listNode = useRef();
	const navigate = useNavigate();
	const location = useLocation();

	if (location.pathname.startsWith("/resetpassword")) {
		return null;
	}

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get("/api/posts");
				setPosts(response.data);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};
		fetchPosts();
	}, []);

	useEffect(() => {
		const handleClickOutside = event => {
			if (
				buttonRef.current &&
				!buttonRef.current.contains(event.target) &&
				inputRef.current &&
				!inputRef.current.contains(event.target) &&
				visibleSearch
			) {
				setVisibleSearch(false);
			}

			if (
				listNode.current &&
				!listNode.current.contains(event.target) &&
				node.current &&
				!node.current.contains(event.target) &&
				isOpen
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [visibleSearch, isOpen]);

	useEffect(() => {
		const links = document.querySelectorAll(".top__list-item .nav__link");
		links.forEach(link => {
			link.addEventListener("click", handleBurgerClick);
		});

		return () => {
			links.forEach(link => {
				link.removeEventListener("click", handleBurgerClick);
			});
		};
	}, [isOpen]);

	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
	};

	const handleVisibleSearch = () => {
		setVisibleSearch(!visibleSearch);
	};

	const handleSearchInputChange = e => {
		const value = e.target.value.trim();
		setSearchQuery(value);
		if (value === "") {
			setSearchResults([]);
			return;
		}
		const results = posts.filter(post =>
			post.title.toLowerCase().includes(value.toLowerCase())
		);
		setSearchResults(results);
	};

	const highlightMatches = (title, searchQuery) => {
		const regex = new RegExp(`(${searchQuery})`, "gi");
		const parts = title.split(regex);

		return parts.map((part, index) => {
			if (index % 2 === 1) {
				// Match, highlight in yellow
				return (
					<span key={index} style={{ color: "#ffff00" }}>
						{part}
					</span>
				);
			} else {
				return part;
			}
		});
	};

	const handleSearchItemClick = postId => {
		navigate(`/post/${postId}`);
	};

	const handleBurgerClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="top">
			<div className="top__left">
				<a
					className="link__top"
					target="_blank"
					href="https://www.facebook.com/"
				>
					<FontAwesomeIcon icon={faFacebook} className="top__icon facebook" />
				</a>

				<a
					className="link__top"
					target="_blank"
					href="https://twitter.com/i/flow/login"
				>
					<FontAwesomeIcon icon={faXTwitter} className="top__icon twitter" />
				</a>
				<a
					className="link__top"
					target="_blank"
					href="https://www.pinterest.com/"
				>
					<FontAwesomeIcon
						icon={faPinterestP}
						className="top__icon pinterest"
					/>
				</a>
				<a
					className="link__top"
					target="_blank"
					href="https://www.instagram.com/accounts/login/"
				>
					<FontAwesomeIcon icon={faInstagram} className="top__icon instagram" />
				</a>
			</div>
			<div ref={listNode} className={`top__center ${isOpen ? "visible" : ""}`}>
				<ul className="top__list">
					<li className="top__list-item">
						<Link title="General page" className="nav__link" to="/">
							<HouseIcon />
							HOME
						</Link>
					</li>
					<li className="top__list-item">
						<Link title="About Application" className="nav__link" to="/about">
							<AboutIcon />
							ABOUT
						</Link>
					</li>
					<li className="top__list-item">
						<Link
							title="Connection with developer"
							className="nav__link"
							to="/contact"
						>
							<ContactIcon />
							CONTACT
						</Link>
					</li>
					<li className="top__list-item">
						<Link title="Write a post" className="nav__link" to="/write">
							<WriteIcon />
							WRITE
						</Link>
					</li>
					<li className="top__list-item">
						<Link
							title="Log out of account"
							className="nav__link"
							onClick={handleLogout}
							to="/login"
						>
							{user && (
								<>
									LOGOUT
									<LogoutIcon />
								</>
							)}
						</Link>
					</li>
				</ul>
			</div>
			<div className="top__right">
				{user ? (
					<Link title="Settings the profile" to="/settings">
						{user.profilePic ? (
							<img
								className="top__image-profile"
								src={user.profilePic}
								alt="profile-icon"
							/>
						) : (
							<IconProfileDefault className="top__image-profile" />
						)}
					</Link>
				) : (
					<>
						<ul className="top__list">
							<li className="top__list-item">
								<Link className="nav__link" to="/login">
									LOGIN
								</Link>
							</li>
							<li className="top__list-item">
								<Link className="nav__link" to="/register">
									REGISTER
								</Link>
							</li>
						</ul>
					</>
				)}
				<button
					title="Search a post "
					ref={buttonRef}
					onClick={handleVisibleSearch}
					className="top__search-btn"
				>
					<SearchIcon />
				</button>
				<div
					ref={node}
					className={`burger__menu ${isOpen ? "open" : ""}`}
					onClick={handleBurgerClick}
				>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<div
					className={`container__form-search ${visibleSearch ? "visible" : ""}`}
				>
					<input
						ref={inputRef}
						className="search__input"
						type="text"
						placeholder="Search a post"
						value={searchQuery}
						onChange={handleSearchInputChange}
					/>

					{searchResults.length > 0 && (
						<ul className="search-results">
							{searchResults.map(result => (
								<li
									key={result._id}
									className="search-result-item"
									onClick={() => handleSearchItemClick(result._id)}
								>
									{highlightMatches(result.title, searchQuery)}
								</li>
							))}
						</ul>
					)}
					{searchResults.length === 0 && searchQuery !== "" && (
						<div className="search-results">No matches found</div>
					)}
				</div>
			</div>
		</div>
	);
}
