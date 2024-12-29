"use client";
import { Geist, Roboto } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
	weight: "400",
});

export default function RootLayout({ children }) {
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
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDarkMode]);

	return (
		<html lang="en" className={isDarkMode ? "dark" : ""}>
			<body
				className={`${geistSans.variable} ${roboto.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
