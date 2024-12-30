"use client";
import DeleteLineButton from "./DeleteLineButton";

export default function InvoiceTable({ lines, onDeleteLine }) {
	const calculateTotal = () =>
		lines.reduce(
			(total, line) =>
				total + (line.isComment ? 0 : line.quantity * line.price),
			0
		);

	return (
		<div>
			<div
				id="invoice-table"
				className="p-4 bg-white shadow-md rounded dark:bg-gray-600"
			>
				{lines.map((line, index) => (
					<div
						key={index}
						className={`flex justify-between items-center border-b py-2 ml-2 p-10 ${
							line.isComment
								? "bg-yellow-100 p-1 dark:bg-teal-800 border-none"
								: ""
						}`}
					>
						<div className="flex-1">
							<p
								className={`font-bold ${
									line.isComment
										? "text-yellow-700 dark:text-teal-400"
										: ""
								}`}
							>
								{line.description}
							</p>
							{!line.isComment && (
								<>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										Quantity: {line.quantity}
									</p>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										Price:
										{line.price === 0 ? (
											<span
												id="free-pill"
												className="bg-green-200 text-green-800 text-xs font-semibold mr-2 px-2.5 mx-3 rounded-full"
											>
												Free
											</span>
										) : (
											`${line.price.toFixed(2)} €`
										)}
									</p>
								</>
							)}
						</div>
						{!line.isComment && (
							<div className="flex items-center space-x-2">
								<p className="font-bold">
									{(line.quantity * line.price).toFixed(2)} €
								</p>
								<DeleteLineButton
									line={line}
									onDelete={onDeleteLine}
								/>
							</div>
						)}
					</div>
				))}
				<div className="mt-4 text-right">
					<h2 className="text-lg font-bold">
						Total: {calculateTotal().toFixed(2)} €
					</h2>
				</div>
			</div>
		</div>
	);
}
