import { useContext } from "react"
import { LoadingAndErrorContext } from "../Context/LoadingContext"
import { createProductApi, updateProductApi, deleteProductApi } from "../Config/product-api"
import toast from "react-hot-toast"


const useAdmin = () => {

    const { setLoading, setError } = useContext(LoadingAndErrorContext)

    const createProduct = (productData) => {
        try {
            setLoading(true);
            const res = createProductApi(productData);
            toast(res.data.message)
        } catch (err) {
            setError(err?.message)
        } finally {
            setLoading(false)
        }
    }
    const updateProduct = (id, updatedProductData) => {
        try {
            setLoading(true);
            const res = updateProductApi(id, updateProductData);
            toast(res.data.message)
        } catch (err) {
            setError(err?.message);
        }
        finally {
            setLoading(false);
        }
    }

    const deleteProduct = (productId) => {
        try {
            setLoading(true);
            const res = deleteProductApi(productId);
            toast(res.data.message);

        } catch (err) {
            setError(err?.message);
        }
        finally {
            setLoading(false);
        }
    }

    return { createProduct, updateProduct, deleteProduct }

}

export { useAdmin }