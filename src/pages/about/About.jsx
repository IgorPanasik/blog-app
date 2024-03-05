import "./about.scss";
import { Link } from "react-router-dom";

export default function About() {
	return (
		<div className="about">
			<h2 className="about__title">About Application</h2>
			<div className="about__info">
				<div className="about__info-subject">
					<div className="about__img">
						<img
							className="about__img-react"
							src="./assets/react-vite-middlemarch-2.png"
							alt="react and vite"
						/>
					</div>
					<p className="about__desc">
						<span
							style={{
								background: "#ffe600",
								color: "#242222",
								padding: "5px 10px 5px 0",
								display: "flex",
								textAlign: "center",
								borderRadius: "2px",
							}}
						>
							This application is written in React.js and the Vite.js builder.
							The advantage of using React + Vite is:
						</span>
						<br />
						<span>Fast development:</span> <br />
						Vite React has a built-in development server that significantly
						speeds up the development of your web applications. This development
						server is much faster than other tools, which means you can develop
						your application in a fraction of the time it would take using other
						tools. <br />
						<br />
						<span>
							Modern JavaScript: <br />
						</span>
						Vite React uses modern JavaScript, which means you can use the
						latest JavaScript features to build your application. Easy to Use:
						Vite React is easy to use even if you are new to web development. It
						comes with many useful features that make developing your
						application much easier. <br />
						<br />
						<span>Customization:</span>
						<br />
						Vite React is customizable, which means you can tailor it to your
						specific needs. You can use plugins to add new features to your
						application or customize existing ones to suit your requirements.
					</p>
				</div>

				<div className="about__info-subject">
					<p className="about__desc">
						<span
							style={{
								background: "#15b406",
								color: "#242222",
								padding: "10px",
								display: "flex",
								textAlign: "center",
								borderRadius: "2px",
							}}
						>
							This application also uses MongoDB, Mongoose JS, Express, node
							JS.:
						</span>
						<br />
						<span style={{ color: "#034903" }}>MongoDB</span>- it is a modern
						database that supports transactional, search, analytics and mobile
						use cases with a flexible document model and a unified query
						interface. MongoDB allows you to develop faster, scale further,
						sleep better, and fully manage MongoDB in the cloud or on local
						servers <br />
						<br />
						<span style={{ color: "#f10303" }}> Mongoose JS</span> - is a
						MongoDB object modeling tool designed to work in an asynchronous
						environment. Mongoose supports Node.js and Deno (alpha). It provides
						a convenient way to define the structure of your data and includes
						built-in data validation. Mongoose can also be used to define
						instance methods and static methods for models, making it easier to
						work with MongoDB data.
						<br />
						<br />
						<span style={{ color: "#1e1f1e" }}>Express.js</span> - is a fast,
						unbiased, minimalistic web framework for Node.js that provides a set
						of features for web and mobile applications. Express provides a thin
						layer of core web application functionality without overshadowing
						the Node.js features you know and love.
						<br />
						<br />
						<span style={{ color: "#029102" }}>Node.js</span> - is an
						open-source, cross-platform JavaScript runtime. Node.js uses
						Chrome's V8 JavaScript engine and provides an event-driven,
						non-blocking I/O model, making it lightweight and efficient. Node.js
						has a huge npm ecosystem module that makes it one of the largest
						open source software ecosystems in the world.
					</p>
					<div className="about__img">
						<img
							className="about__img-react"
							src="./assets/mongoose-mongo,express,node.jpg"
							alt="react and vite"
						/>
					</div>
				</div>

				<div className="about__info-subject">
					<p className="about__desc">
						<span
							style={{
								background: "#d6da07",
								color: "#242222",
								padding: "10px",
								display: "flex",
								justifyContent: "center",
								borderRadius: "2px",
							}}
						>
							By using Firebase Storage to store dynamically loaded images, you
							benefit from:
						</span>
						<br />
						<span>Reliability:</span> <br />
						Firebase Storage ensures high availability and reliability, with
						built-in redundancy to prevent data loss.
						<br />
						<br />
						<span>Scalability:</span> <br />
						It scales seamlessly to accommodate growing amounts of data and
						traffic, making it suitable for applications of any size.
						<br />
						<br />
						<span>Performance:</span> <br />
						Images stored in Firebase Storage are delivered quickly to users,
						thanks to its global content delivery network (CDN) that optimizes
						delivery based on user location.
						<br />
						<br />
						<span>Security:</span> <br />
						Firebase Storage provides robust security features, including
						fine-grained access control and encryption, to protect your users'
						data and privacy.
						<br />
						<br />
						<span>Integration:</span> <br />
						It seamlessly integrates with other Firebase services, such as
						Firebase Authentication and Firebase Realtime Database, enabling you
						to build comprehensive and feature-rich applications.
						<br />
						<br />
						<p
							style={{
								textAlign: "center",
								background: "#a3a3a3",
								padding: "10px",
								borderRadius: "7px",
							}}
						>
							Firebase is a powerful platform that provides a wide range of
							services for building and managing web and mobile applications.
							One of its key features is Firebase Storage, which offers secure
							and scalable storage solutions for storing user-generated content
							such as images, videos, and other media files. Overall, Firebase
							Storage simplifies the process of storing and serving images in
							your application, allowing you to focus on delivering a great user
							experience without worrying about managing infrastructure or
							scalability issues.
						</p>
					</p>
					<div className="about__img">
						<img
							className="about__img-react"
							src="./assets/firebase.png"
							alt="firebase"
						/>
					</div>
				</div>
				<div className="about__info-subject">
					<p style={{ textAlign: "center" }} className="about__desc">
						As well as searching, adding, editing and deleting posts.It is also
						possible to view all posts of any user by his name. Update and
						delete profile. Password verification and hashing, as well as a
						reset link and creation of a new password...{" "}
						<span style={{ color: "#13a500" }}>
							If you find any errors, bugs, comments or thanks, please contact
							the{" "}
							<Link className="link" to="/contact">
								developer
							</Link>
							.
						</span>{" "}
						Thanks a lot!
					</p>
				</div>
				<div className="about__info-subject"></div>
			</div>
		</div>
	);
}
