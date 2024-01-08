import { configureStore } from '@reduxjs/toolkit'

import { postsReducer } from './reducers/postSlice/postsSlice.tsx'
import { counterReducer } from './reducers/counterSlice/counterSlice.tsx'
import { createPostReducer } from './reducers/createPost/createPostSlice.tsx'
import { onePostReducer } from './reducers/onePostSlice/onePostSlice.tsx'


export const store = configureStore({
    reducer: {
        postsReducer,
        counterReducer,
        createPostReducer,
        onePostReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']