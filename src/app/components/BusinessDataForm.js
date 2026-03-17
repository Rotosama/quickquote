"use client";

export default function BusinessDataForm({ data, onChange }) {
	const handleChange = (e) => {
		const { name, value } = e.target;
		const [section, field] = name.split(".");
		onChange({
			...data,
			[section]: {
				...data[section],
				[field]: value,
			},
		});
	};

	return (
		<div className="space-y-6">
			{/* Emitter Section */}
			<div className="space-y-3">
				<h3 className="text-xs font-bold uppercase tracking-wider text-primary">Your Details (Emitter)</h3>
				<div className="grid grid-cols-1 gap-3">
					<input
						type="text"
						name="emitter.name"
						placeholder="Business Name / Your Name"
						value={data.emitter.name}
						onChange={handleChange}
						className="input-field"
					/>
					<div className="grid grid-cols-2 gap-3">
						<input
							type="text"
							name="emitter.cif"
							placeholder="CIF / NIF / Tax ID"
							value={data.emitter.cif}
							onChange={handleChange}
							className="input-field"
						/>
						<input
							type="text"
							name="emitter.phone"
							placeholder="Phone"
							value={data.emitter.phone}
							onChange={handleChange}
							className="input-field"
						/>
					</div>
					<input
						type="text"
						name="emitter.paymentInfo"
						placeholder="Payment Info (IBAN, SWIFT, PayPal, etc.)"
						value={data.emitter.paymentInfo || ""}
						onChange={handleChange}
						className="input-field"
					/>
					<textarea
						name="emitter.address"
						placeholder="Address"
						value={data.emitter.address}
						onChange={handleChange}
						className="input-field min-h-[60px] py-3"
					/>
				</div>
			</div>

			{/* Client Section */}
			<div className="space-y-3">
				<h3 className="text-xs font-bold uppercase tracking-wider text-primary">Client Details</h3>
				<div className="grid grid-cols-1 gap-3">
					<input
						type="text"
						name="client.name"
						placeholder="Client Name / Company"
						value={data.client.name}
						onChange={handleChange}
						className="input-field"
					/>
					<input
						type="text"
						name="client.cif"
						placeholder="Client Tax ID"
						value={data.client.cif}
						onChange={handleChange}
						className="input-field"
					/>
					<textarea
						name="client.address"
						placeholder="Client Address"
						value={data.client.address}
						onChange={handleChange}
						className="input-field min-h-[60px] py-3"
					/>
				</div>
			</div>
		</div>
	);
}
