"use client";

export default function TaxDiscountForm({ tax, discount, onTaxChange, onDiscountChange }) {
	return (
		<div className="grid grid-cols-2 gap-4 pt-2">
			<div>
				<label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Tax Rate (IVA %)</label>
				<select
					value={tax}
					onChange={(e) => onTaxChange(Number(e.target.value))}
					className="input-field"
				>
					<option value="0">0% (Exento)</option>
					<option value="4">4% (Superreducido)</option>
					<option value="10">10% (Reducido)</option>
					<option value="21">21% (General)</option>
				</select>
			</div>
			<div>
				<label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Global Discount (%)</label>
				<input
					type="number"
					value={discount}
					onChange={(e) => onDiscountChange(Number(e.target.value))}
					className="input-field"
					min="0"
					max="100"
				/>
			</div>
		</div>
	);
}
