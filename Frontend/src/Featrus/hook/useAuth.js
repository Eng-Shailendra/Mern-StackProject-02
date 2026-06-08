import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { LoadingAndErrorContext } from "../Context/LoadingContext";
import toast from "react-hot-toast";
import {
    forgotPasswordApi,
    loginUserApi,
    registerUserApi,
    verifyOTPApi,
    sendOTPApi,
    updatePasswordApi,
} from "../Config/auth-api";

const useAuth = () => {
    const { user, setUser } = useContext(UserContext);
    const { loading, setLoading, error, setError } = useContext(LoadingAndErrorContext);

    const registerUser = async ({ username, email, password }) => {
        try {
            setLoading(true);
            const resp = await registerUserApi({ username, email, password });
            setUser(resp.data);
            toast(resp.data.message);
            return resp.data.success;
        } catch (err) {
            console.log(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const loginUser = async ({ email, password }) => {
        try {
            setLoading(true);
            const resp = await loginUserApi({ email, password });
            setUser(resp.data);
            toast(resp.data.message);
            return resp.data.success;
        } catch (err) {
            console.log(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const forgotPassword = async ({ email }) => {
        try {
            setLoading(true);
            const resp = await forgotPasswordApi({ email });
            toast(resp.data.message);
            return resp.data.success;
        } catch (err) {
            console.log(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const updatePassword = async ({ newPassword, conformPassword }) => {
        try {
            setLoading(true);
            const resp = await updatePasswordApi({ newPassword, conformPassword });
            toast(resp.data.message);
            return resp.data.success;
        } catch (err) {
            console.log(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const sendOtp = async () => {
        try {
            setLoading(true);
            const resp = await sendOTPApi();
            toast(resp.data.message);
            return resp.data.success;
        } catch (err) {
            console.log(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async ({ otp }) => {
        try {
            setLoading(true);
            const resp = await verifyOTPApi({ otp });
            toast(resp.data.message);
            return resp.data.success;
        } catch (err) {
            console.log(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        registerUser,
        loginUser,
        forgotPassword,
        sendOtp,
        verifyOtp,
        updatePassword,
        user,
        loading,
        error,
    };
};

export default useAuth;


