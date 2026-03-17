"use client";

export default function DeleteLineButton({ line, onDelete }) {
	return (
		<button
			onClick={() => onDelete(line)}
			className="delete-button p-2 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-destructive/10"
			title="Delete line"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
		</button>
	);
}
