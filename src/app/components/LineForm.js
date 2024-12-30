"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function LineForm({ onAddLine }) {
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [price, setPrice] = useState(0);
	const [isFormVisible, setIsFormVisible] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		onAddLine({ id: uuidv4(), description, quantity, price });
		setDescription("");
		setQuantity(1);
		setPrice(0);
		setIsFormVisible(false);
	};

	return (
		<div>
			<button
				onClick={() => setIsFormVisible(!isFormVisible)}
				className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100 bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 mb-2 rounded-full"
			>
				{isFormVisible ? "Cancel" : "Add Line"}
			</button>
			{isFormVisible && (
				<form onSubmit={handleSubmit} className="mt-4">
					<input
						type="text"
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full border border-slate-400 p-2 rounded mb-1"
						required
					/>
					<input
						type="number"
						placeholder="Quantity"
						value={quantity}
						onChange={(e) => setQuantity(Number(e.target.value))}
						className="w-full border border-slate-400 p-2 rounded mb-1"
						min="1"
						required
					/>
					<input
						type="number"
						placeholder="Price"
						value={price}
						onChange={(e) => setPrice(Number(e.target.value))}
						className="w-full border border-slate-400 p-2 rounded mb-1"
						step="0.01"
						required
					/>
					<button
						type="submit"
						className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded mt-3 animate-pulse"
					>
						Add Line
					</button>
				</form>
			)}
		</div>
	);
}
