import "./post.scss";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import formatDate from "../../util/dateUtils";
import { useState } from "react";

export default function Post({ post }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div className="post">
			{post.photo && (
				<div className="container__img">
					<img
						className={`post__image ${isHovered ? "post__image--zoom" : ""}`}
						src={post.photo}
						alt="poster the post"
					/>
				</div>
			)}

			<div className="post__info">
				<div className="post__cats">
					{post.categories.map(category => {
						<h3 key={uuidv4()} className="post__cat">
							{category.name}
						</h3>;
					})}
				</div>
				<Link
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					to={`/post/${post._id}`}
					className="link"
				>
					<h2 className="post__title">{post.title}</h2>
				</Link>

				<span className="post__date">{formatDate(post.createdAt)}</span>
			</div>
			<p className="post__description">{post.desc}</p>
		</div>
	);
}
