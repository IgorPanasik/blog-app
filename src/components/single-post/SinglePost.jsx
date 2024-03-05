import { useLocation } from "react-router";
import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";
import "./single-post.scss";
import "./singlePostMediaQuery.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import formatDate from "../../util/dateUtils";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import SendIcon from "./SendIcon";

export default function SinglePost() {
	const location = useLocation();
	const path = location.pathname.split("/")[2];
	const [post, setPost] = useState({});
	const { user } = useContext(Context);
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [updateMode, setUpdateMode] = useState(false);

	useEffect(() => {
		const getPost = async () => {
			const response = await axios.get("/api/posts/" + path);

			setPost(response.data);
			setTitle(response.data.title);
			setDesc(response.data.desc);
		};

		getPost();
	}, [path]);

	const handleDelete = async () => {
		try {
			await axios.delete(`/api/posts/${post._id}`, {
				data: { username: user.username },
			});
			window.location.replace("/");
		} catch (error) {}
	};

	const handleUpdate = async () => {
		try {
			await axios.put(`/api/posts/${post._id}`, {
				username: user.username,
				title,
				desc,
			});

			setUpdateMode(false);
		} catch (error) {}
	};

	return (
		<div className="single__post">
			<div className="single__post-wrapper">
				{post.photo && (
					<img
						src={post.photo}
						alt="image post"
						className="single__post-image"
					/>
				)}
				{updateMode ? (
					<input
						autoFocus
						type="text"
						value={title}
						onChange={e => setTitle(e.target.value)}
						className="single__postTitle-input"
					/>
				) : (
					<h1 className="single__post-title">
						{title}
						{post.username === user?.username && (
							<div className="single__post-edit">
								<div
									className="wrapper__edit"
									onClick={() => {
										setUpdateMode(true);
									}}
								>
									<EditIcon />
								</div>
								<div className="wrapper__delete" onClick={handleDelete}>
									<DeleteIcon />
								</div>
							</div>
						)}
					</h1>
				)}

				<div className="single__post-info">
					<span className="single__post-author">
						<Link className="link" to={`/?user=${post.username}`}>
							Author: <strong>{post.username}</strong>
						</Link>
					</span>
					<span className="single__post-date">
						{formatDate(post.createdAt)}
					</span>
				</div>
				{updateMode ? (
					<textarea
						className="single__postDesc-input"
						value={desc}
						onChange={e => setDesc(e.target.value)}
					/>
				) : (
					<p className="single__post-description">{desc}</p>
				)}
				{updateMode && (
					<button className="single__post-apply" onClick={handleUpdate}>
						<span>
							Apply
							<SendIcon />
						</span>
					</button>
				)}
			</div>
		</div>
	);
}
