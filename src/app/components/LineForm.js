"use client";
import { useState } from "react";

export default function LineForm({ onAddLine }) {
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [price, setPrice] = useState();
	const [isFormVisible, setIsFormVisible] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		onAddLine({ description, quantity, price });
		setDescription("");
		setQuantity(1);
		setPrice(0);

		setIsFormVisible(false);
	};

	return (
		<div>
			<button
				onClick={() => setIsFormVisible(!isFormVisible)}
				className="bg-blue-500 text-white px-4 py-2 rounded"
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
						className="w-full border p-2 rounded mb-1"
						required
					/>
					<div className=""></div>
					<input
						type="number"
						placeholder="Quantity"
						value={quantity}
						onChange={(e) => setQuantity(Number(e.target.value))}
						className="w-full border p-2 rounded mb-1"
						min="1"
						required
					/>
					<input
						type="number"
						placeholder="Price"
						value={price}
						onChange={(e) => setPrice(Number(e.target.value))}
						className="w-full border p-2 rounded mb-1"
						step="0.01"
						required
					/>

					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 rounded mt-2 animate-pulse"
					>
						Add Line
					</button>
				</form>
			)}
		</div>
	);
}
