import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
    name: "chekout",
    initialState: {
        game_id: 0,
        user_id: "",
        zone_id: "",
        server: "",
        username: "",
        payment: {
            id: 0,
            category: '',
            prev_category: '',
            type: '',
            fee: ''
        },
        product: {
            price: 0,
            code: ""
        },
        voucher: {
            discount: 0,
            code: "",
        },
        phone: ""
    },
    reducers: {
        addToCheckout: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const { addToCheckout } = checkoutSlice.actions
export default checkoutSlice.reducer