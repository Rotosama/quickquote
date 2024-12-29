"use client";

export default function DeleteLineButton({ line, onDelete }) {
	return (
		<button
			onClick={() => onDelete(line)}
			className="bg-red-500 text-white px-4 py-2 rounded mb-2"
		>
			Delete
		</button>
	);
}
