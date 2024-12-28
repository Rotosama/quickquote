"use client";

export default function ClearTableButton({ onClear }) {
	return (
		<button
			onClick={onClear}
			className="bg-red-500 text-white px-4 py-2 rounded mb-4"
		>
			Clear Table
		</button>
	);
}
