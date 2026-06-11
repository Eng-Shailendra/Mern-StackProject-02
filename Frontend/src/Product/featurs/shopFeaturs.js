import { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { productContext } from "../../Featrus/Context/ProductContext";
import useProduct from "../../Featrus/hook/useProduct";


const shopFeaturs = () => {
    const { product } = useContext(productContext);
    const { loading, getProduct } = useProduct();
    const [searchParam, setSearchParam] = useSearchParams();
    const urlCategory = searchParam.get("category") || "All";
    const [activeCategory, setActiveCategory] = useState(urlCategory);
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("Popular");

    useEffect(() => {
        setActiveCategory(urlCategory);
    }, [urlCategory]);

    useEffect(() => {
        if (!product.length) {
            getProduct();
        }
    }, [getProduct, product.length]);

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(
            new Set(product.map((item) => item.category || "Other")),
        );
        return ["All", ...uniqueCategories];
    }, [product]);

    const filteredByCategory = useMemo(() => {
        if (activeCategory === "All") return product;
        return product.filter(
            (item) => (item.category || "Other") === activeCategory,
        );
    }, [activeCategory, product]);

    const filteredProduct = useMemo(() => {
        const lowerQuery = query.trim().toLowerCase();
        if (!lowerQuery) return filteredByCategory;

        return filteredByCategory.filter((item) => {
            const name = (item.name || item.title || "").toLowerCase();
            const description = (item.description || "").toLowerCase();
            const category = (item.category || "").toLowerCase();

            return (
                name.includes(lowerQuery) ||
                description.includes(lowerQuery) ||
                category.includes(lowerQuery)
            );
        });
    }, [filteredByCategory, query]);

    const sortedProducts = useMemo(() => {
        const products = [...filteredProduct];

        switch (sort) {
            case "Newest":
                return products.sort((a, b) => {
                    const aTime = Date.parse(a.createdAt || a.updatedAt || 0);
                    const bTime = Date.parse(b.createdAt || b.updatedAt || 0);
                    return bTime - aTime;
                });
            case "Price Low → High":
                return products.sort((a, b) => (a.price || 0) - (b.price || 0));
            case "Price High → Low":
                return products.sort((a, b) => (b.price || 0) - (a.price || 0));
            default:
                return products;
        }
    }, [filteredProduct, sort]);


    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setSearchParam(category === "All" ? {} : { category });
    };
    return { handleCategoryChange, product, setQuery, query, sort, setSort, activeCategory, setActiveCategory, sortedProducts, filteredProduct, categories, loading }
}

export default shopFeaturs;