import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const items = action.payload;
            const existItem = state.cartItems.find((x) => x._id === items._id);
            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === items._id ? items : x)
            } else {
                state.cartItems = [...state.cartItems, items];

            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            const items = action.payload;
            state.cartItems = state.cartItems.filter((x) => x._id !== items._id);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.clear("cartItems")
        }
    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;