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
				className="bg-yellow-500 text-white px-4 py-2 rounded"
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
						className="bg-yellow-500 text-white px-4 py-2 rounded animate-pulse"
					>
						Add Comment
					</button>
				</form>
			)}
		</div>
	);
}
