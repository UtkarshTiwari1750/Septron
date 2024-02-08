import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")): 0,
}

const cartSlice = createSlice( {
    name: "cart",
    initialState: initialState,
    reducers: {
        setTotalItems(state, value) {
            state.totalItems = value.payload;
        },

        // Add to cart
        addToCart: (state, actions) => {
            const content = actions.payload;
            const index = state.cart.findIndex( (item) => item._id === content._id);

            if(index >= 0) {
                // If content is already in the cart, do not modify the cart
                toast.error("Content already in cart");
                return;
            }

            // If Content is not in the cart, add it to the cart
            state.cart.push(content);
            // Update the total quantity and price
            state.totalItems++;
            state.total += content.price; 
            // Update to local storage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

            // Show toast
            toast.success("Course added to cart");
        },

        // Remove from cart
        removeFromCart: (state, actions) => {
            const content = actions.payload;
            const index = state.cart.findIndex((item) => item._id === content._id);

            if(index < 0){
                // If Content is not in cart don't do anything
                toast.error("Content not in cart");
                return;
            }

            // If Content is present in cart remove it
            state.total -= state.cart[index].price;
            state.cart.splice(index, 1);
            state.totalItems--;
            // Update to localStorage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            toast.success("Content removed from cart");
        },
        resetCart: (state, actions) => {
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;

            // Update to localStorage
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");
        }
    }
})

export const {setTotalItems, resetCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;