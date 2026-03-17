"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LineForm from "./components/LineForm";
import InvoiceTable from "./components/InvoiceTable";
import CommentForm from "./components/CommentForm";
import ClearTableButton from "./components/ClearTableButton";
import BusinessDataForm from "./components/BusinessDataForm";
import LogoUpload from "./components/LogoUpload";
import TaxDiscountForm from "./components/TaxDiscountForm";
import { v4 as uuidv4 } from "uuid";

const DarkModeToggle = dynamic(() => import("./components/DarkModeToggle"), {
	ssr: false,
});
const ExportPDFButton = dynamic(() => import("./components/ExportPDFButton"), {
	ssr: false,
});

export default function Home() {
	const [lines, setLines] = useState([]);
	const [isMounted, setIsMounted] = useState(false);
	const [invoiceNumber, setInvoiceNumber] = useState("");
	
	// Complex state with LocalStorage persistence
	const [businessData, setBusinessData] = useState({
		emitter: { name: "", cif: "", address: "", phone: "", paymentInfo: "" },
		client: { name: "", cif: "", address: "" }
	});
	const [logo, setLogo] = useState(null);
	const [taxRate, setTaxRate] = useState(21);
	const [globalDiscount, setGlobalDiscount] = useState(0);
	const [expiryDate, setExpiryDate] = useState("");

	useEffect(() => {
		setIsMounted(true);
		setInvoiceNumber(`${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
		
		// Load from LocalStorage
		const savedEmitter = localStorage.getItem("quickquote_emitter");
		const savedLogo = localStorage.getItem("quickquote_logo");
		const savedTax = localStorage.getItem("quickquote_tax");
		
		if (savedEmitter) {
			setBusinessData(prev => ({ ...prev, emitter: JSON.parse(savedEmitter) }));
		}
		if (savedLogo) setLogo(savedLogo);
		if (savedTax) setTaxRate(Number(savedTax));

		// Set default expiry date (30 days from now)
		const date = new Date();
		date.setDate(date.getDate() + 30);
		setExpiryDate(date.toISOString().split('T')[0]);
	}, []);

	// Save to LocalStorage effects
	useEffect(() => {
		if (isMounted) {
			localStorage.setItem("quickquote_emitter", JSON.stringify(businessData.emitter));
		}
	}, [businessData.emitter, isMounted]);

	useEffect(() => {
		if (isMounted) {
			localStorage.setItem("quickquote_logo", logo || "");
		}
	}, [logo, isMounted]);

	useEffect(() => {
		if (isMounted) {
			localStorage.setItem("quickquote_tax", taxRate.toString());
		}
	}, [taxRate, isMounted]);

	const addLine = (line) => {
		setLines([...lines, line]);
	};

	const addComment = (comment) => {
		setLines([...lines, { id: uuidv4(), description: comment, isComment: true }]);
	};
	
	const clearTable = () => {
		setLines([]);
		// We don't clear the logo/emitter by default for better UX, but we can clear lines
	};

	const deleteLine = (lineToDelete) => {
		setLines(lines.filter((line) => line.id !== lineToDelete.id));
	};

	return (
		<main className="min-h-screen bg-background transition-colors duration-300">
			<header className="container mx-auto px-4 py-6 flex justify-between items-center bg-transparent">
				<div className="flex items-center space-x-2">
					<div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg ring-4 ring-primary/20">
						Q
					</div>
					<h1 className="text-2xl font-bold tracking-tight text-foreground">
						Quick<span className="text-primary">Quote</span>
					</h1>
				</div>
				<DarkModeToggle />
			</header>

			<div className="container mx-auto px-4 pb-20">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
					{/* Left Side: Controls */}
					<aside className="lg:col-span-4 space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
						<div className="glass-card p-6 border-border/50">
							<h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
								Configuration
							</h2>
							
							<div className="space-y-6">
								<LogoUpload onLogoChange={(l) => setLogo(l)} />
								<BusinessDataForm data={businessData} onChange={(d) => setBusinessData(d)} />
								<div className="space-y-3">
									<h3 className="text-xs font-bold uppercase tracking-wider text-primary">Budget Validity</h3>
									<input 
										type="date" 
										className="input-field" 
										value={expiryDate} 
										onChange={(e) => setExpiryDate(e.target.value)} 
									/>
								</div>
								<TaxDiscountForm 
									tax={taxRate} 
									discount={globalDiscount} 
									onTaxChange={(t) => setTaxRate(t)} 
									onDiscountChange={(d) => setGlobalDiscount(d)} 
								/>
								<hr className="border-border/50" />
								<div className="space-y-4">
									<CommentForm onAddComment={addComment} />
									<LineForm onAddLine={addLine} />
								</div>
							</div>
						</div>

						{lines.length > 0 && (
							<div className="flex flex-col sm:flex-row gap-3 pt-2">
								<ExportPDFButton elementId="invoice-preview" />
								<ClearTableButton onClear={clearTable} />
							</div>
						)}
					</aside>

					{/* Right Side: Invoice Preview */}
					<section className="lg:col-span-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
						<div id="invoice-preview" className="bg-card shadow-2xl rounded-2xl overflow-hidden border border-border min-h-[900px] flex flex-col">
							{/* Invoice Header */}
							<div className="p-10 border-b border-border bg-muted/20">
								<div className="flex justify-between items-start mb-12">
									<div className="space-y-4">
										{logo ? (
											<img src={logo} alt="Logo" className="max-h-20 max-w-[200px] object-contain" />
										) : (
											<div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-3xl shadow-lg ring-4 ring-primary/10">
												Q
											</div>
										)}
										<div className="space-y-1">
											<h1 className="text-3xl font-black tracking-tight">PRO-FORMA</h1>
											{isMounted && (
												<p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Nº {invoiceNumber}</p>
											)}
										</div>
									</div>
									<div className="text-right space-y-6">
										<div className="space-y-1">
											<p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Date of Issue</p>
											{isMounted && (
												<p className="text-lg font-bold">{new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
											)}
										</div>
										<div className="space-y-1">
											<p className="text-[10px] font-black uppercase tracking-[0.2em] text-destructive/80">Valid Until</p>
											{isMounted && (
												<p className="text-lg font-bold">{new Date(expiryDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
											)}
										</div>
									</div>
								</div>

								{/* Business Details Grid */}
								<div className="grid grid-cols-2 gap-12">
									<div className="space-y-3">
										<p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary underline decoration-2 underline-offset-4">Emitter</p>
										<div className="space-y-1">
											<p className="font-bold text-lg leading-none">{businessData.emitter.name || "Your Business Name"}</p>
											<p className="text-sm font-medium text-muted-foreground">{businessData.emitter.cif || "Tax ID: 00000000X"}</p>
											<p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">{businessData.emitter.address || "Your Address\nCity, Country"}</p>
											{businessData.emitter.phone && <p className="text-sm text-muted-foreground">T: {businessData.emitter.phone}</p>}
										</div>
									</div>
									<div className="space-y-3">
										<p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground decoration-2 underline-offset-4">Bill To</p>
										<div className="space-y-1">
											<p className="font-bold text-lg leading-none">{businessData.client.name || "Client Name / Company"}</p>
											<p className="text-sm font-medium text-muted-foreground">{businessData.client.cif || "Client Tax ID"}</p>
											<p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">{businessData.client.address || "Client Address\nCity, Country"}</p>
										</div>
									</div>
								</div>
							</div>
							
							<div className="flex-1 p-10">
								<InvoiceTable 
									lines={lines} 
									onDeleteLine={deleteLine} 
									taxRate={taxRate} 
									globalDiscount={globalDiscount} 
								/>
								
								{businessData.emitter.paymentInfo && (
									<div className="mt-12 p-6 bg-muted/30 rounded-xl border border-border/50 max-w-sm">
										<h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Payment Instructions</h4>
										<p className="text-sm font-bold text-foreground bg-background p-3 rounded border border-border/50 font-mono italic">
											{businessData.emitter.paymentInfo}
										</p>
									</div>
								)}
							</div>
							
							<div className="p-10 bg-muted/5 border-t border-border mt-auto">
								<div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
									<p>QuickQuote &copy; {new Date().getFullYear()} Invoicing System</p>
									{isMounted && <p>Document Auth Code: {uuidv4().split('-')[0].toUpperCase()}</p>}
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</main>
	);
}
