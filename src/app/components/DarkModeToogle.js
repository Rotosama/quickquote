"use client";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const darkMode = window.localStorage.getItem("darkMode") === "true";
			setIsDarkMode(darkMode);
			if (darkMode) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		}
	}, []);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		window.localStorage.setItem("darkMode", !isDarkMode);
		if (!isDarkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	};

	return (
		<button
			onClick={toggleDarkMode}
			className="bg-gray-800 text-white p-2 rounded"
		>
			{isDarkMode ? "Light Mode" : "Dark Mode"}
		</button>
	);
}
