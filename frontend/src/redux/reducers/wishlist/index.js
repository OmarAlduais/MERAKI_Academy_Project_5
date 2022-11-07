import { createSlice } from "@reduxjs/toolkit";
console.log("yazee");

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
      console.log(state.wishlist);
    },
    deleteFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((product) => {
        return product.id !== action.payload;
      });
    },
  },
});

export const { setWishlist, deleteFromWishlist, addToWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
