"use client";
import { useState } from "react";

export default function CommentForm({ onAddComment }) {
	const [comment, setComment] = useState("");
	const [isFormVisible, setIsFormVisible] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (comment.trim()) {
			onAddComment(comment);
			setComment("");
		}
		setIsFormVisible(false);
	};

	return (
		<div className="mb-4">
			<button
				onClick={() => setIsFormVisible(!isFormVisible)}
				className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100 bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 mb-2 rounded-full"
			>
				{isFormVisible ? "Cancel" : "Add Comment"}
			</button>
			{isFormVisible && (
				<form onSubmit={handleSubmit} className="mt-4">
					<input
						type="text"
						placeholder="Add Comment"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						className="w-full border p-2 mb-2"
						required
					/>
					<button
						type="submit"
						className="bg-yellow-600 dark:bg-teal-600 text-black dark:text-white px-4 py-2 rounded animate-pulse"
					>
						Add Comment
					</button>
				</form>
			)}
		</div>
	);
}
