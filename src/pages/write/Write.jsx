import { useContext, useState, useEffect, useRef } from "react";
import AddIcon from "./AddIcon";
import "./write.scss";
import { Context } from "../../components/context/Context";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import WriteImg from "./WriteImg";
import PublishImg from "./PublushImg";

export default function Write() {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [file, setFile] = useState(null);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");

	const { user } = useContext(Context);

	const fileInputRef = useRef();

	useEffect(() => {
		const fetchCategories = async () => {
			const res = await axios.get("/api/categories");
			setCategories(res.data);
		};
		fetchCategories();
		console.log(categories);
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		const newPost = {
			username: user.username,
			title,
			desc,
			categories,
		};
		if (file) {
			const data = new FormData();
			const filename = uuidv4() + file.name;
			data.append("name", filename);
			data.append("file", file);

			try {
				const response = await axios.post("/api/upload", data);
				newPost.photo = response.data.downloadURL;
			} catch (err) {}
		}
		try {
			const response = await axios.post("/api/posts", newPost);
			window.location.replace("/post/" + response.data._id);
		} catch (err) {}
	};

	const handleDragOver = e => {
		e.preventDefault();
	};

	const handleDrop = e => {
		e.preventDefault();
		if (e.dataTransfer.items) {
			if (e.dataTransfer.items[0].kind === "file") {
				const file = e.dataTransfer.items[0].getAsFile();
				setFile(file);
			}
		}
	};

	return (
		<div className="write">
			<div
				title="Upload an image or Drag and Drop"
				className="write__wrapper-empty"
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			>
				{file ? (
					<img
						src={URL.createObjectURL(file)}
						className="write__image"
						alt="image a post"
					/>
				) : (
					<WriteImg />
				)}
			</div>

			<form className="write__form" onSubmit={handleSubmit}>
				<select
					id="category"
					className="write__input-select"
					value={selectedCategory}
					onChange={e => setSelectedCategory(e.target.value)}
				>
					<option value="" disabled>
						Category
					</option>
					{categories.map((cat, i) => (
						<option key={i} value={cat.name}>
							{cat.name}
						</option>
					))}
				</select>

				<div className="write__form-group">
					<input
						type="file"
						id="file__input"
						style={{ display: "none" }}
						onChange={e => setFile(e.target.files[0])}
					/>

					<input
						type="text"
						placeholder="Title"
						className="write__input"
						autoFocus={true}
						onChange={e => setTitle(e.target.value)}
					/>
					<label title="Upload Image" htmlFor="file__input">
						<AddIcon />
					</label>
				</div>
				<div className="write__form-group">
					<textarea
						placeholder="Tell your story..."
						type="text"
						className="write__input write__text"
						onChange={e => setDesc(e.target.value)}
					></textarea>

					<button title="Publish" className="write__submit" type="submit">
						<PublishImg />
					</button>
				</div>
			</form>
		</div>
	);
}
