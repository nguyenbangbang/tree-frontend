import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartItems: [], // Luôn khởi tạo giỏ hàng trống
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Thêm thành công sản phẩm",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Thêm sản phẩm mới thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },

    removeFromCart: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload._id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (i) => i._id !== action.payload._id
        );
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
