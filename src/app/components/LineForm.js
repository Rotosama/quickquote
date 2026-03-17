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
		<div className="w-full mt-4">
			<button
				onClick={() => setIsFormVisible(!isFormVisible)}
				className="w-full flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-all group"
			>
				<span className="text-sm font-medium text-foreground flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
					{isFormVisible ? "Cancel Line Item" : "Add a new line item"}
				</span>
				<div className={`transition-transform duration-200 ${isFormVisible ? 'rotate-45' : ''}`}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-foreground"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
				</div>
			</button>

			{isFormVisible && (
				<form onSubmit={handleSubmit} className="mt-3 space-y-4 animate-fade-in p-1">
					<div className="space-y-3">
						<div>
							<label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Description</label>
							<input
								type="text"
								placeholder="What are you charging for?"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="input-field"
								required
							/>
						</div>
						<div className="grid grid-cols-2 gap-3">
							<div>
								<label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Quantity</label>
								<input
									type="number"
									value={quantity}
									onChange={(e) => setQuantity(Number(e.target.value))}
									className="input-field"
									min="1"
									required
								/>
							</div>
							<div>
								<label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Unit Price (€)</label>
								<input
									type="number"
									value={price}
									onChange={(e) => setPrice(Number(e.target.value))}
									className="input-field"
									step="0.01"
									required
								/>
							</div>
						</div>
					</div>
					<button
						type="submit"
						className="btn-primary w-full shadow-md hover:shadow-lg transition-all transform active:scale-[0.98]"
					>
						Add to Invoice
					</button>
				</form>
			)}
		</div>
	);
}
