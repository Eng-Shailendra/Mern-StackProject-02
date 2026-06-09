import { api } from "../../axiosInstance.js";

export const loginUserApi = async ({ email, password }) => {
    const resp = await api.post("/login", { email, password });
    return resp;
}

export const registerUserApi = async ({ fullname, email, password }) => {
    const resp = await api.post("/register", { fullname, email, password });
    return resp;
}

export const forgotPasswordApi = async ({ email }) => {
    const resp = await api.post("/forgot-password", { email });
    return resp;
}

export const updatePasswordApi = async ({ newPassword, conformPassword }) => {
    const resp = await api.post("/update-password", { newPassword, conformPassword });
    return resp;
}

export const sendOTPApi = async () => {
    const resp = await api.post("/send-otp");
    return resp;
}

export const verifyOTPApi = async ({ otp }) => {
    const resp = await api.post("/verify-otp", { otp });
    return resp;
}
