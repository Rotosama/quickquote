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
		<div className="w-full">
			<button
				onClick={() => setIsFormVisible(!isFormVisible)}
				className="w-full flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-all group"
			>
				<span className="text-sm font-medium text-foreground flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-muted-foreground"
					>
						<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
					</svg>
					{isFormVisible ? "Cancel Comment" : "Add a note or comment"}
				</span>
				<div
					className={`transition-transform duration-200 ${isFormVisible ? "rotate-45" : ""}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-muted-foreground group-hover:text-foreground"
					>
						<line x1="12" y1="5" x2="12" y2="19"></line>
						<line x1="5" y1="12" x2="19" y2="12"></line>
					</svg>
				</div>
			</button>

			{isFormVisible && (
				<form
					onSubmit={handleSubmit}
					className="mt-3 space-y-3 animate-fade-in"
				>
					<div className="relative">
						<textarea
							placeholder="Type your comment here..."
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							className="input-field min-h-[80px] py-3 resize-none"
							required
						/>
					</div>
					<button
						type="submit"
						className="btn-primary w-full shadow-sm"
					>
						Add Comment
					</button>
				</form>
			)}
		</div>
	);
}
