import { api } from "../../axiosInstance";

const getProductApi = async () => {
    const res = await api.get("/product");
    return res;

}
const getProductByIdApi = async (id) => {
    const res = await api.get(`/product/${id}`);
    return res;
}

const createProductApi = async (productData) => {
    const res = await api.post(`/product`, productData);
    return res;
}

const updateProductApi = async (id, productData) => {
    const res = await api.put(`product/${id}`, productData);
    return res;
}

const deleteProductApi = async (id) => {
    const res = await api.delete(`product/${id}`);
    return res;
}

export { getProductApi, getProductByIdApi, createProductApi, updateProductApi, deleteProductApi };