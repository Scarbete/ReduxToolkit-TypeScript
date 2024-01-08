import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { IPost } from '../../models/IPost.tsx'
import { ApiRoutes } from '../../api/api.tsx'
import { asyncGetAllPosts } from './postsSlice.tsx'

// interface SerializedError {
//     name?: string
//     message?: string
//     code?: string
//     stack?: string
// }

// interface RejectedAction<ThunkArg> {
//     type: string
//     payload: undefined
//     error: SerializedError | any
//     meta: {
//         requestId: string
//         arg: ThunkArg
//         aborted: boolean
//         condition: boolean
//     }
// }

// interface RejectedWithValueAction<ThunkArg, RejectedValue> {
//     type: string
//     payload: RejectedValue
//     error: { message: 'Rejected' }
//     meta: {
//         requestId: string
//         arg: ThunkArg
//         aborted: boolean
//     }
// }

// interface RejectPayloadValue {
//     error: {
//         message: string
//     },
//     meta: {
//         aborted: boolean,
//         arg: IPost,
//         condition: boolean,
//         rejectedWithValue: boolean,
//         requestId: string,
//         requestStatus: string
//     },
//     payload: string,
//     type: string
// }

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
            const response = await axios.post(`${ApiRoutes.posts}s`, post)
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
        setTitle: (state, action: PayloadAction<string>): void => {
            state.title = action.payload
        },
        setBody: (state, action: PayloadAction<string>): void => {
            state.body = action.payload
        },
        setPrice: (state, action: PayloadAction<string>): void => {
            state.price = action.payload
        },
        clearInputs: (state): void => {
            state.title = ''
            state.body = ''
            state.price = ''
        }
    },
    extraReducers: ({ addCase }): void => {
        addCase(asyncCreatePost.pending, (state): void => {
            state.loading = true
            state.error = ''
        })
        addCase(asyncCreatePost.fulfilled, (state): void => {
            state.loading = false
        })
        addCase(asyncCreatePost.rejected, (state, action: PayloadAction<string>): void => {
            state.loading = false
            console.log(action)
            state.error = action.payload || 'Неизвестная ошибка!'
        })
    }
})

export { createPostAction, createPostReducer }