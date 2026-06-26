import { useDispatch } from "react-redux"
import { addToCart, removeFromCart, clearCart } from "../redux/CartSlice"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Podcast } from "lucide-react";


const useCartFeaturs = () => {
    const dispathch = useDispatch();
    const navigate = useNavigate()

    const handleAddToCart = (product) => {
        const add = () => {
            dispathch(addToCart(
                product ? {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.image || product.imageUrl || product.imageUrls?.[0]?.url,
                    quantity: product.quantity || 1
                } : null
            ));
            toast.success("Add to cart ");
        }
        add();
    }

    const handleRemoveToCart = (product) => {
        const remove = () => {

            dispathch(removeFromCart(
                product ? {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    quantity: 1
                } : null
            ));
            toast.success("Remove  from cart ");
        }
        remove();
    }

    const handleClearCart = () => {
        const clear = () => {
            dispathch(clearCart())
        }
        clear()
    }

    const hadleDubbleClick = (item) => {

        const dubbleClick = () => {
            navigate(`/product/${item._id}`);
        }
        dubbleClick();
    }

    return { handleAddToCart, handleRemoveToCart, handleClearCart, hadleDubbleClick };
}

export default useCartFeaturs;