const formatDate = date => {
	const options = {
		weekday: "long",
		day: "2-digit",
		month: "short",
		year: "numeric",
	};

	const newDate = new Date(date);
	let day = newDate.toLocaleDateString("en-US", options);
	day = day.replace(/,/g, "");
	const [weekday, month, dayNum, year] = day.split(" ");
	return `${weekday}, ${dayNum} ${month} ${year}`;
};

export default formatDate;
