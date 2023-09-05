import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
	title: "Add Product - Flowmazon",
};

async function addProduct(formData: FormData) {
	"use server";

	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/api/auth/signin?callbackUrl=/add-product");
	}
	const name = formData.get("name")?.toString();
	const description = formData.get("description")?.toString();
	const imageUrl = formData.get("imageUrl")?.toString();
	const price = Number(formData.get("price") || 0);

	if (!name || !description || !imageUrl || !price) {
		throw Error("Missing required fields");
	}

	await prisma.product.create({
		data: { name, description, imageUrl, price },
	});

	redirect("/");
}

export default async function AddProductPage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/api/auth/signin?callbackUrl=/add-product");
	}
	return (
		<div>
			<h1 className="text-lg mb-3 font-bold">Add Product</h1>
			<form action={addProduct}>
				<input
					type="text"
					required
					name="name"
					placeholder="Type here"
					className="input input-bordered w-full mb-3"
				/>
				<textarea
					required
					placeholder="Description"
					name="description"
					className="textarea textarea-bordered mb-3 w-full"
				></textarea>
				<input
					type="url"
					required
					name="imageUrl"
					placeholder="Image URL"
					className="input input-bordered w-full mb-3"
				/>
				<input
					type="number"
					required
					name="price"
					placeholder="Price"
					className="input input-bordered w-full mb-3"
				/>
				<FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
			</form>
		</div>
	);
}
