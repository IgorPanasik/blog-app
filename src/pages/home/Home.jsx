import "./home.scss";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки
	const { search } = useLocation();

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get("/api/posts" + search);
				setPosts(response.data);

				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};
		fetchPosts();
	}, [search]);

	return (
		<>
			<Header />
			<div className="home">
				{isLoading ? (
					<div className="spinner-cube">
						<div></div>
						<div></div>
					</div>
				) : posts.length > 0 ? (
					<>
						<Posts posts={posts} />
						<Sidebar />
					</>
				) : (
					<>
						<img src="./assets/empty.jpg" alt="No posts" />
						<Sidebar />
					</>
				)}
			</div>
		</>
	);
}
