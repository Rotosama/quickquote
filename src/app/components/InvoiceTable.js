"use client";

export default function InvoiceTable({ lines }) {
	const calculateTotal = () =>
		lines.reduce(
			(total, line) =>
				total + (line.isComment ? 0 : line.quantity * line.price),
			0
		);

	return (
		<div className="p-4 bg-white shadow-md rounded">
			{lines.map((line, index) => (
				<div
					key={index}
					className={`flex justify-between border-b py-2 ${
						line.isComment ? "bg-yellow-100" : ""
					}`}
				>
					<div>
						<p
							className={`font-bold ${
								line.isComment ? "text-yellow-700" : ""
							}`}
						>
							{line.description}
						</p>
						{!line.isComment && (
							<>
								<p className="text-sm text-gray-500">
									Quantity: {line.quantity}
								</p>
								<p className="text-sm text-gray-500">
									Price: ${line.price.toFixed(2)}
								</p>
							</>
						)}
					</div>
					{!line.isComment && (
						<div className="text-right">
							<p className="font-bold">
								${(line.quantity * line.price).toFixed(2)}
							</p>
						</div>
					)}
				</div>
			))}
			<div className="mt-4 text-right">
				<h2 className="text-lg font-bold">
					Total: ${calculateTotal().toFixed(2)}
				</h2>
			</div>
		</div>
	);
}
