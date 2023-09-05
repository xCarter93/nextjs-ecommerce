"use client";

import { ShoppingCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";

interface ShoppingCartButtonProps {
	cart: ShoppingCart | null;
}

export default function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
	function closeDropdown() {
		const elem = document.activeElement as HTMLElement;
		if (elem) {
			elem.blur();
		}
	}

	return (
		<div className="dropdown dropdown-end">
			<label tabIndex={0} className="btn-ghost btn btn-circle">
				<div className="indicator">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
						/>
					</svg>
					<span className="badge badge-sm indicator-item">
						{cart?.size || 0}
					</span>
				</div>
			</label>
			<div
				tabIndex={0}
				className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow z-30"
			>
				<div className="card-body">
					{cart?.items.map((item, index) => (
						<div key={index} className="flex items-center mb-4">
							<Image
								src={item.product.imageUrl}
								alt={item.product.name}
								height={20}
								width={20}
								className="w-12 h-12 mr-4 rounded-full"
							/>
							<div className="flex justify-between w-full text-xs">
								<span>{item.product.name}</span>
								<span className="flex items-center">{item.quantity}</span>
							</div>
						</div>
					))}
					<span className="text-lg font-bold">{cart?.size || 0} items</span>
					<span className="text-info">
						Subtotal: {formatPrice(cart?.subtotal || 0)}
					</span>
					<div className="card-actions">
						<Link
							href="/cart"
							className="btn btn-primary btn-block"
							onClick={closeDropdown}
						>
							View Cart
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
