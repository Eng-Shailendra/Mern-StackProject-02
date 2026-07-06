import { useCallback, useContext } from "react";
import { getProductApi, getProductByIdApi } from "../Config/product-api";
import { LoadingAndErrorContext } from "../Context/LoadingContext";
import toast from "react-hot-toast";
import { productContext } from "../Context/ProductContext";

const useProduct = () => {
    const { loading, setLoading, error, setError } = useContext(LoadingAndErrorContext);
    const { setProduct } = useContext(productContext);
    const getProduct = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getProductApi();
            setProduct(res.data.data);
            toast(res.data.message);
            return res.data.data;
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Product Loading failed"
            )
            setError(err.response?.data)
        } finally {
            setLoading(false);
        }
    }, [setError, setLoading, setProduct]);


    const getProductById = async (id) => {
        try {
            setLoading(true);
            const res = await getProductByIdApi(id);
            toast(res.data.message);
            return res.data.data;

        } catch (err) {
            toast.error(
                err.response?.data?.message || "Product Loading failed"
            )
            setError(err.response?.data)
        } finally {
            setLoading(false);
        }
    }

    return { getProduct, getProductById, loading, error };
}
export default useProduct;