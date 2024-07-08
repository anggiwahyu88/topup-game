import { configureStore } from "@reduxjs/toolkit";
import CheckoutReducer from "../slice/user/checkoutSlice";

const store = configureStore({
    reducer: { chekout: CheckoutReducer}
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch