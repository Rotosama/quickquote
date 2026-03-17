"use client";
import DeleteLineButton from "./DeleteLineButton";

export default function InvoiceTable({ lines, onDeleteLine, taxRate = 21, globalDiscount = 0 }) {
	const subtotal = lines.reduce(
		(total, line) => total + (line.isComment ? 0 : line.quantity * line.price),
		0
	);

	const discountAmount = (subtotal * globalDiscount) / 100;
	const baseImponible = subtotal - discountAmount;
	const taxAmount = (baseImponible * taxRate) / 100;
	const total = baseImponible + taxAmount;

	return (
		<div className="w-full">
			<div className="space-y-1">
				{/* Table Header */}
				{lines.some(l => !l.isComment) && (
					<div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-border text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
						<div className="col-span-6">Description</div>
						<div className="col-span-2 text-center">Qty</div>
						<div className="col-span-2 text-right">Price</div>
						<div className="col-span-2 text-right px-4">Total</div>
					</div>
				)}

				<div className="divide-y divide-border/50">
					{lines.map((line) => (
						<div
							key={line.id}
							className={`group relative grid grid-cols-12 gap-4 items-center p-4 transition-colors hover:bg-muted/30 ${
								line.isComment
									? "bg-primary/5 italic text-primary/80 border-l-4 border-primary/30"
									: ""
							}`}
						>
							<div className={line.isComment ? "col-span-11" : "col-span-6"}>
								<p className={`text-sm font-medium ${line.isComment ? 'leading-relaxed text-primary/90' : 'text-foreground'}`}>
									{line.description}
								</p>
							</div>

							{!line.isComment && (
								<>
									<div className="col-span-2 text-center text-sm text-muted-foreground font-medium">
										{line.quantity}
									</div>
									<div className="col-span-2 text-right text-sm text-muted-foreground font-mono">
										{line.price === 0 ? (
											<span className="text-emerald-600 font-bold uppercase text-[10px] tracking-tight">Free</span>
										) : (
											`${line.price.toFixed(2)}€`
										)}
									</div>
									<div className="col-span-2 text-right text-sm font-bold text-foreground font-mono pr-4">
										{(line.quantity * line.price).toFixed(2)}€
									</div>
								</>
							)}

							<div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
								<DeleteLineButton line={line} onDelete={onDeleteLine} />
							</div>
						</div>
					))}
				</div>

				{lines.length > 0 && (
					<div className="mt-8 pt-8 space-y-3 flex flex-col items-end px-4 border-t border-border/60">
						<div className="flex justify-between w-full max-w-[280px] text-sm text-muted-foreground">
							<span className="font-medium">Subtotal</span>
							<span className="font-mono">{subtotal.toFixed(2)}€</span>
						</div>
						
						{globalDiscount > 0 && (
							<div className="flex justify-between w-full max-w-[280px] text-sm text-emerald-600 font-medium">
								<span>Discount ({globalDiscount}%)</span>
								<span className="font-mono">-{discountAmount.toFixed(2)}€</span>
							</div>
						)}

						<div className="flex justify-between w-full max-w-[280px] text-sm text-foreground font-bold">
							<span>Base Imponible</span>
							<span className="font-mono">{baseImponible.toFixed(2)}€</span>
						</div>

						<div className="flex justify-between w-full max-w-[280px] text-sm text-muted-foreground/80">
							<span className="font-medium">IVA ({taxRate}%)</span>
							<span className="font-mono">{taxAmount.toFixed(2)}€</span>
						</div>

						<div className="flex justify-between w-full max-w-[280px] pt-4 mt-2 border-t border-border">
							<span className="text-xl font-black text-foreground uppercase tracking-tighter">Total</span>
							<span className="text-2xl font-black text-primary font-mono tracking-tighter tabular-nums">
								{total.toFixed(2)}€
							</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
