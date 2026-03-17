"use client";
import { useState, useRef } from "react";

export default function LogoUpload({ onLogoChange }) {
	const [preview, setPreview] = useState(null);
	const fileInputRef = useRef(null);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
				onLogoChange(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const removeLogo = () => {
		setPreview(null);
		onLogoChange(null);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	return (
		<div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-border rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
			{preview ? (
				<div className="relative group">
					<img src={preview} alt="Business Logo" className="max-h-24 max-w-full rounded object-contain mb-2" />
					<button
						onClick={removeLogo}
						className="absolute -top-2 -right-2 bg-destructive text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
					</button>
				</div>
			) : (
				<div 
					className="cursor-pointer flex flex-col items-center"
					onClick={() => fileInputRef.current?.click()}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mb-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
					<span className="text-xs font-medium text-muted-foreground">Upload Business Logo</span>
				</div>
			)}
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
				accept="image/*"
				className="hidden"
			/>
		</div>
	);
}
