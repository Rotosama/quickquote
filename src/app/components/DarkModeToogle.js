"use client";
import { useState, useEffect } from "react";

export default function DarkModeToggle() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme");
		if (storedTheme) {
			setIsDarkMode(storedTheme === "dark");
		} else {
			setIsDarkMode(
				window.matchMedia("(prefers-color-scheme: dark)").matches
			);
		}
	}, []);

	useEffect(() => {
		const handleChange = (e) => {
			setIsDarkMode(e.matches);
		};

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDarkMode]);

	return (
		<button
			onClick={() => setIsDarkMode((prevMode) => !prevMode)}
			className="p-2 rounded-full bg-gray-300 text-white dark:bg-gray-600"
		>
			<img
				src={isDarkMode ? "/icons/sun.png" : "/icons/moon.png"}
				alt={isDarkMode ? "Light Mode" : "Dark Mode"}
				className="w-6 h-6"
			/>
		</button>
	);
}
