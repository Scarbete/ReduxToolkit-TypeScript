import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { IPost } from '../../../models/IPost.tsx'
import { getErrorMessage } from '../CustomRejectedAction.tsx'
import { ApiRoutes } from '../../../api/api.tsx'
import { PostsState } from './types.tsx'

const initialState: PostsState = {
    posts: [],
    loading: false,
    error: '',
}


export const asyncGetAllPosts = createAsyncThunk<IPost[]>(
    'postsSlice/asyncGetAllPosts', async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get<IPost[]>(ApiRoutes.posts)
            return data
        }
        catch (e) {
            return rejectWithValue('Загрузка постов не удалась!')
        }
    }
)


export const asyncRemovePost = createAsyncThunk(
    'postsSlice/asyncRemovePost', async (id: number, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.delete(`${ApiRoutes.posts}/${id}`)
            if (response.status <= 204 && response.status >= 200) dispatch(asyncGetAllPosts())
        }
        catch (e) {
            return rejectWithValue('Не удалось удалить пост!')
        }
    }
)


const { actions: postsAction, reducer: postsReducer } = createSlice({
    name: 'postsSlice',
    initialState,
    reducers: {},
    extraReducers: ({ addCase }): void => {
        addCase(asyncGetAllPosts.pending, (state): void => {
            state.loading = true
            state.error = ''
        })
        addCase(asyncGetAllPosts.fulfilled, (state, action: PayloadAction<IPost[]>): void => {
            state.loading = false
            state.posts = action.payload
        })
        addCase(asyncGetAllPosts.rejected, (state, action): void => {
            state.loading = false
            state.error = getErrorMessage(action)
        })
        addCase(asyncRemovePost.pending, (state): void => {
            state.loading = true
        })
        addCase(asyncRemovePost.fulfilled, (state): void => {
            state.loading = false
        })
        addCase(asyncRemovePost.rejected, (state, action): void => {
            state.loading = false
            state.error = getErrorMessage(action)
        })
    },
})

export { postsAction, postsReducer }