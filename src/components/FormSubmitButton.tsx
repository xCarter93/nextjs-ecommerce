"use client";

import { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type FormSubmitButton = {
	children: React.ReactNode;
	className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
	children,
	className,
	...props
}: FormSubmitButton) {
	const { pending } = useFormStatus();
	return (
		<button
			{...props}
			disabled={pending}
			type="submit"
			className={`btn btn-primary ${className}`}
		>
			{pending && <span className="loading loading-spinner loading-lg" />}
			{children}
		</button>
	);
}
