import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import activityReducer from './slices/activitySlice'
import cartReducer from './slices/cartSlice'
import reviewReducer from './slices/reviewSlice'
import wishlistReducer from './slices/wishlistSlice'
import transactionReducer from './slices/transactionSlice'
import categoryReducer from './slices/categorySlice'
import bannerReducer from './slices/bannerSlice'
import promoReducer from './slices/promoSlice'
import adminReducer from './slices/adminSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    activities: activityReducer,
    cart: cartReducer,
    reviews: reviewReducer,
    wishlist: wishlistReducer,
    transaction: transactionReducer,
    categories: categoryReducer,
    banners: bannerReducer,
    promos: promoReducer,
    admin: adminReducer,
  },
}) 