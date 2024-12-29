"use client";
import html2pdf from "html2pdf.js";

export default function ExportPDFButton({ elementId, fileName }) {
	const exportPDF = () => {
		const element = document.getElementById(elementId);
		const deleteButtons = element.querySelectorAll(".delete-button");

		deleteButtons.forEach((button) => (button.style.display = "none"));

		const opt = {
			margin: 1,
			filename: fileName,
			image: { type: "jpeg", quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
		};

		html2pdf()
			.from(element)
			.set(opt)
			.save()
			.then(() => {
				deleteButtons.forEach(
					(button) => (button.style.display = "block")
				);
			});
	};

	return (
		<button
			onClick={exportPDF}
			className="bg-green-500 text-white px-4 py-2 rounded mb-4"
		>
			Export as PDF
		</button>
	);
}
