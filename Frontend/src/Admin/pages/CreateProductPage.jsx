import React, { useRef } from "react";

const CreateProductPage = () => {
    const nameRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    const categoryRef = useRef();
    const stockRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const productData = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            price: Number(priceRef.current.value),
            category: categoryRef.current.value,
            stock: Number(stockRef.current.value),
        };

        console.log(productData);

        // API Call
        // createProduct(productData)
    };

    return (
        <section className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Create New Product
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label>Product Name</label>
                    <input
                        ref={nameRef}
                        type="text"
                        className="w-full border p-3 rounded"
                        placeholder="Product Name"
                    />
                </div>

                <div>
                    <label>Description</label>
                    <textarea
                        ref={descriptionRef}
                        rows={4}
                        className="w-full border p-3 rounded"
                        placeholder="Description"
                    />
                </div>

                <div>
                    <label>Price</label>
                    <input
                        ref={priceRef}
                        type="number"
                        className="w-full border p-3 rounded"
                        placeholder="Price"
                    />
                </div>

                <div>
                    <label>Category</label>
                    <select
                        ref={categoryRef}
                        className="w-full border p-3 rounded"
                    >
                        <option value="">Select Category</option>
                        <option value="beauty">Beauty</option>
                        <option value="fashion">Fashion</option>
                        <option value="electronics">Electronics</option>
                    </select>
                </div>

                <div>
                    <label>Stock</label>
                    <input
                        ref={stockRef}
                        type="number"
                        className="w-full border p-3 rounded"
                        placeholder="Stock"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded"
                >
                    Create Product
                </button>
            </form>
        </section>
    );
};

export default CreateProductPage;