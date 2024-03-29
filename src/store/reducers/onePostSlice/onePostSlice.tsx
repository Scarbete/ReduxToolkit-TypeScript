import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiRoutes } from '../../../api/api.tsx'
import { IPost } from '../../../models/IPost.tsx'
import { EditPostArgs, onePostState } from './types.tsx'
import { getErrorMessage } from '../CustomRejectedAction.tsx'


const initialState: onePostState = {
    post: null,
    loading: false,
    error: '',
    editLoading: false
}


export const asyncGetOnePost = createAsyncThunk(
    'postsSlice/asyncGetOnePost', async (id: number, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${ApiRoutes.posts}/${id}`)
            return data
        }
        catch (e) {
            return rejectWithValue('Не удалость загрузить пост!')
        }
    }
)


export const asyncEditPost = createAsyncThunk(
    'onePostSlice/asyncEditPost', async ({ postID, newPost }: EditPostArgs, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.put(`${ApiRoutes.posts}/${postID}`, newPost)
            console.log(response)
            if (response.status <= 204 && response.status >= 200) dispatch(asyncGetOnePost(postID))
        }
        catch (e) {
            return rejectWithValue('Не удалость изменить данные!')
        }
    }
)


const { actions: onePostActon, reducer: onePostReducer } = createSlice({
    name: 'onePostSlice',
    initialState,
    reducers: {},
    extraReducers: ({ addCase }): void => {
        addCase(asyncGetOnePost.pending, (state): void => {
            state.loading = true
        })
        addCase(asyncGetOnePost.fulfilled, (state, action: PayloadAction<IPost>): void => {
            state.loading = false
            state.post = action.payload
        })
        addCase(asyncGetOnePost.rejected, (state, action): void => {
            state.loading = false
            state.error = getErrorMessage(action)
        })
        addCase(asyncEditPost.pending, (state): void => {
            state.editLoading = true
        })
        addCase(asyncEditPost.fulfilled, (state): void => {
            state.editLoading = false
        })
        addCase(asyncEditPost.rejected, (state, action): void => {
            state.editLoading = false
            state.error = getErrorMessage(action)
        })
    }
})

export { onePostActon, onePostReducer }