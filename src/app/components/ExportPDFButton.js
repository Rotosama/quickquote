"use client";
import html2pdf from "html2pdf.js";

export default function ExportPDFButton({ elementId }) {
	const exportPDF = () => {
		const element = document.getElementById(elementId);
		const deleteButtons = element.querySelectorAll(".delete-button");

		deleteButtons.forEach((button) => (button.style.display = "none"));

		const currentDate = new Date();
		const formattedDate = currentDate.toISOString().slice(0, 10);
		const formattedTime = currentDate
			.toTimeString()
			.slice(0, 8)
			.replace(/:/g, "-");
		const fileName = `invoice_${formattedDate}_${formattedTime}.pdf`;

		const opt = {
			margin: 0.5,
			filename: fileName,
			image: { type: "jpeg", quality: 0.98 },
			html2canvas: {
				scale: 2,
				ignoreElements: (element) => element.id === "free-pill",
			},
			jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
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
			className="bg-green-400 text-black dark:bg-green-800 dark:text-white px-4 py-2 rounded-full mb-4 mt-4"
		>
			Export as PDF
		</button>
	);
}
