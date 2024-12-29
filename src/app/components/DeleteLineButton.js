"use client";

export default function DeleteLineButton({ line, onDelete }) {
	return (
		<button
			onClick={() => onDelete(line)}
			className="delete-button px-4 py-2 rounded mb-2"
		>
			<img src="/icons/trash.png" alt="delete" className="w-5 h-5"></img>
		</button>
	);
}
