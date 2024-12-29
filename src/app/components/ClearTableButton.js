"use client";

export default function ClearTableButton({ onClear }) {
	return (
		<button
			onClick={onClear}
			className="bg-red-400 dark:bg-red-800 px-4 py-2 rounded-full mb-4 mt-4"
		>
			<img
				src="/icons/trash.png"
				alt="delete"
				className="w-5 h-5 icon-delete"
			></img>
		</button>
	);
}
