"use client";
import html2pdf from "html2pdf.js";

export default function ExportPDFButton({ elementId }) {
	const exportPDF = () => {
		const element = document.getElementById(elementId);
		const deleteButtons = element.querySelectorAll(".delete-button");

		// Hide UI elements and force light mode for export
		deleteButtons.forEach((button) => (button.style.display = "none"));
		element.classList.add("pdf-export-mode");

		const currentDate = new Date();
		const formattedDate = currentDate.toISOString().slice(0, 10);
		const formattedTime = currentDate
			.toTimeString()
			.slice(0, 8)
			.replace(/:/g, "-");
		const fileName = `invoice_${formattedDate}_${formattedTime}.pdf`;

		const opt = {
			margin: 10,
			filename: fileName,
			image: { type: "jpeg", quality: 0.98 },
			html2canvas: {
				scale: 2,
				useCORS: true,
				letterRendering: true,
				backgroundColor: "#ffffff", // Ensure white background
			},
			jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
		};

		html2pdf()
			.from(element)
			.set(opt)
			.save()
			.then(() => {
				// Revert changes
				deleteButtons.forEach(
					(button) => (button.style.display = "flex")
				);
				element.classList.remove("pdf-export-mode");
			});
	};

	return (
		<button
			onClick={exportPDF}
			className="flex-2 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-bold text-sm shadow-md hover:shadow-lg active:scale-[0.98]"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
			Download PDF
		</button>
	);
}
