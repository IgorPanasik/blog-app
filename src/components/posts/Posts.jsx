import React from "react";
import Post from "../post/Post";
import "./posts.scss";

import { v4 as uuidv4 } from "uuid";
import { Link, Element } from "react-scroll";
import UpIcon from "./UpIcon";

export default function Posts({ posts }) {
	return (
		<div className="posts">
			{posts.map((post, index) => (
				<div key={uuidv4()}>
					{index === 0 && <Element name="firstPost" />}
					<Post post={post} />
				</div>
			))}
			{posts.length > 5 && (
				<Link className="LinkUp" to="firstPost" smooth={true} duration={500}>
					<UpIcon />
					Go to first post
				</Link>
			)}
		</div>
	);
}
