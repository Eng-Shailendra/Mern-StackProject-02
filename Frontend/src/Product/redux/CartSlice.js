import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: (
        JSON.parse(localStorage.getItem("cartItems")) || []
    ).filter(Boolean),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            state.cartItems = state.cartItems.filter(Boolean);

            const existItem = state.cartItems.find(
                (x) => x._id === item._id
            );

            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === item._id
                        ? { ...x, quantity: x.quantity + 1 }
                        : x
                );
            } else {
                state.cartItems.push(item);
            }

            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.cartItems)
            );
        },
        removeFromCart: (state, action) => {
            const item = action.payload;

            state.cartItems = state.cartItems.filter(
                (x) => x._id !== item._id
            );

            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.cartItems)
            );
        },

        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cartItems");
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;