import "./single-post.scss";

export default function DeleteIcon() {
	return (
		<>
			<svg
				className="singe__post-item delete-icon"
				viewBox="0 0 72 72"
				id="emoji"
			>
				<g>
					<path
						fill="#FFFFFF"
						stroke="none"
						d="M51.7598,17H20.1525v37.65c0,4.0593,3.2907,5.6209,7.35,5.6209h16.9073c4.0593,0,7.35-1.5616,7.35-5.6209 V17z"
					/>
					<polyline
						fill="#FFFFFF"
						stroke="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeMiterlimit="10"
						strokeWidth="2"
						points="31,16 31,12 41,12 41,16"
					/>
					<polygon
						fill="#9b9a9a"
						stroke="none"
						points="51,37 51,46.5172 51,57.6207 48.3,60 33,60"
					/>
					<rect
						x="17"
						y="16"
						width="38"
						height="4"
						fill="#FFFFFF"
						stroke="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeMiterlimit="10"
						strokeWidth="2"
					/>
				</g>
				<g id="hair" />
				<g id="skin" />
				<g id="skin-shadow" />
				<g id="line">
					<polyline
						className="color"
						fill="none"
						stroke="#000000"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeMiterlimit="10"
						strokeWidth="2"
						points="31,16 31,12 41,12 41,16"
					/>
					<path
						className="color"
						fill="none"
						stroke="#000000"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeMiterlimit="10"
						strokeWidth="2"
						d="M51,25v31c0,2.2091-1.7909,4-4,4H25c-2.2091,0-4-1.7909-4-4V25"
					/>
					<rect
						className="color"
						x="17"
						y="16"
						width="38"
						height="4"
						fill="none"
						stroke="#000000"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeMiterlimit="10"
						strokeWidth="2"
					/>
					<line
						className="color-white"
						x1="41"
						x2="41"
						y1="28.25"
						y2="55"
						fill="none"
						stroke="#000000"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeMiterlimit="10"
						strokeWidth="2"
					/>
					<line
						className="color-white"
						x1="31"
						x2="31"
						y1="28.25"
						y2="55"
						fill="none"
						stroke="#000000"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeMiterlimit="10"
						strokeWidth="2"
					/>
				</g>
			</svg>
		</>
	);
}
