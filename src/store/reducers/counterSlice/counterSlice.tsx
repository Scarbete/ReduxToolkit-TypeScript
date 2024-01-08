import { createSlice } from '@reduxjs/toolkit'
import { counterState } from './types'

const initialState: counterState = {
    count: 0
}

const { actions: counterAction, reducer: counterReducer } = createSlice({
    name: 'postsSlice',
    initialState,
    reducers: {
        plus(state): void {
            state.count += 1
        },
        minus(state): void {
            state.count -= 1
        }
    }
})

export { counterAction, counterReducer }