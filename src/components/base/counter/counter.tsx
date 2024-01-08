import { counterAction } from '../../../store/reducers/counterSlice/counterSlice.tsx'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.tsx'
import { FC } from 'react'


export const Counter: FC = () => {
    const { count } = useAppSelector(state => state.counterReducer)
    const dispatch = useAppDispatch()

    return (
        <div style={{display: 'flex'}}>
            <button onClick={() => dispatch(counterAction.minus())}>minus</button>
            <h3>{count}</h3>
            <button onClick={() => dispatch(counterAction.plus())}>plus</button>
        </div>
    )
}