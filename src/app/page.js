"use client";

import { useState } from "react";
import LineForm from "./components/LineForm";
import InvoiceTable from "./components/InvoiceTable";
import CommentForm from "./components/CommentForm";
import DarkModeToggle from "./components/DarkModeToogle";
import ClearTableButton from "./components/ClearTableButton";
import ExportPDFButton from "./components/ExportPDFButton";

export default function Home() {
	const [lines, setLines] = useState([]);

	const addLine = (line) => {
		setLines([...lines, line]);
	};

	const addComment = (comment) => {
		setLines([...lines, { description: comment, isComment: true }]);
	};
	const clearTable = () => {
		setLines([]);
	};

	const deleteLine = (lineToDelete) => {
		setLines(lines.filter((line) => line.id !== lineToDelete.id));
	};
	return (
		<>
			<div className="flex justify-center p-4">
				<DarkModeToggle />
			</div>
			<div className="flex flex-col lg:flex-row p-4">
				{/* Left Side: Form to add lines */}
				<div className="justify-center items-center w-full lg:w-1/2 p-4">
					<CommentForm onAddComment={addComment} />
					<LineForm onAddLine={addLine} />
				</div>

				{/* Right Side: Invoice Preview */}
				<div className="w-full lg:w-1/2 p-4">
					<h1 className="text-2xl font-bold mb-4">Invoice</h1>
					<InvoiceTable lines={lines} onDeleteLine={deleteLine} />
					{lines.length > 0 && (
						<div className="flex justify-evenly">
							<ClearTableButton onClear={clearTable} />
							<ExportPDFButton elementId="invoice-table" />
						</div>
					)}
				</div>
			</div>
		</>
	);
}
