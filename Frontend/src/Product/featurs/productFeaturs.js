import React from 'react'
import { useNavigate } from "react-router-dom"

const useProductFeature = () => {
    const navigate = useNavigate();

    const handleMoreBtn = (product) => {
        navigate(`shop?category=${product.category}`)
    }

    return { handleMoreBtn }

    
}
export default useProductFeature;