"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface CartEntryPageProps {
	cartItem: CartItemWithProduct;
	setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({
	cartItem: { product, quantity },
	setProductQuantity,
}: CartEntryPageProps) {
	const [isPending, startTransition] = useTransition();

	const quantityOptions: JSX.Element[] = [];
	for (let i = 1; i <= 99; i++) {
		quantityOptions.push(
			<option key={i} value={i}>
				{i}
			</option>
		);
	}
	return (
		<div>
			<div className="flex flex-wrap items-center gap-3">
				<Image
					src={product.imageUrl}
					alt={product.name}
					width={200}
					height={200}
					className="rounded-lg"
				/>
				<div>
					<Link href={`/products/${product.id}`} className="font-bold">
						{product.name}
					</Link>
					<div>Price: {formatPrice(product.price)}</div>
					<div className="my-1 flex items-center gap-2">
						Quantity:
						<select
							onChange={(e) => {
								const newQuantity = parseInt(e.currentTarget.value);
								startTransition(async () => {
									await setProductQuantity(product.id, newQuantity);
								});
							}}
							defaultValue={quantity}
							className="select select-bordered w-full max-w-[80px]"
						>
							<option value={0}>0 (Remove)</option>
							{quantityOptions}
						</select>
					</div>
					<div className="flex items-center gap-3">
						Subtotal: {formatPrice(product.price * quantity)}
						{isPending && (
							<span className="loading loading-spinner loading-md"></span>
						)}
					</div>
				</div>
			</div>
			<div className="divider" />
		</div>
	);
}
