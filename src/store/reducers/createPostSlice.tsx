import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { IPost } from '../../models/IPost.tsx'
import { ApiRoutes } from '../../api/api.tsx'
import { asyncGetAllPosts } from './postsSlice.tsx'

interface createPostsState {
    title: string
    body: string
    price: string
    loading: boolean
    error: string
}

const initialState: createPostsState = {
    title: '',
    body: '',
    price: '',
    loading: false,
    error: ''
}


export const asyncCreatePost = createAsyncThunk(
    'createPostSlice/asyncCreatePost', async (post: IPost, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(ApiRoutes.posts, post)
            if (response.status <= 204 && response.status >= 200) {
                dispatch(asyncGetAllPosts())
                dispatch(createPostAction.clearInputs())
            }
        }
        catch (e) {
            return rejectWithValue('Не удалость создать пост!')
        }
    }
)


const { actions: createPostAction, reducer: createPostReducer } = createSlice({
    name: 'createPostSlice',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        },
        setBody: (state, action: PayloadAction<string>) => {
            state.body = action.payload
        },
        setPrice: (state, action: PayloadAction<string>) => {
            state.price = action.payload
        },
        clearInputs: (state) => {
            state.title = ''
            state.body = ''
            state.price = ''
        }
    },
    extraReducers: ({ addCase }) => {
        addCase(asyncCreatePost.pending, (state): void => {
            state.loading = true
            state.error = ''
        })
        addCase(asyncCreatePost.fulfilled, (state): void => {
            state.loading = false
        })
        addCase(asyncCreatePost.rejected, (state, action: PayloadAction<string>): void => {
            state.loading = false
            state.error = action.payload || 'Неизвестная ошибка!'
        })
    }
})

export { createPostAction, createPostReducer }