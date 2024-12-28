"use client";
import { Geist, Geist_Mono, Monomaniac_One } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import DarkModeToggle from "./components/DarkModeToogle";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const monomaniacOne = Monomaniac_One({
	variable: "--font-monomaniac-one",
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
				className={`${geistSans.variable} ${monomaniacOne.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
