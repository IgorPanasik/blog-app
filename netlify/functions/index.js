import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import serverless from "serverless-http";
import authRoute from "./api/routes/auth";
import userRoute from "./api/routes/users";
import postRoute from "./api/routes/posts";
import categoryRoute from "./api/routes/categories";
import sendRoute from "./api/routes/send";

dotenv.config();

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const appFireBase = initializeApp(firebaseConfig);
const storage = getStorage(appFireBase);

const app = express();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	next();
});

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch(err => console.log(err));

const upload = multer();

app.post("/api/upload", upload.single("file"), async (req, res) => {
	try {
		const file = req.file;
		const storageRef = ref(storage, "images/" + file.originalname);
		const fileData = file.buffer;
		await uploadBytes(storageRef, fileData);
		console.log("File has been uploaded");

		const downloadURL = await getDownloadURL(storageRef);

		res.status(200).json({ message: "File has been uploaded", downloadURL });
	} catch (error) {
		console.error("Error uploading file", error);
		res
			.status(500)
			.json({ error: "Failed to upload file", details: error.message });
	}
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/send", sendRoute);

export const handler = serverless(app);
