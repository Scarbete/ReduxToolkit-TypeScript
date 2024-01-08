import { PayloadAction } from '@reduxjs/toolkit/react'

export const UndefinedError = 'Неизвестная ошибка!'

export interface CustomRejectedAction {
    message: string
}

export const getErrorMessage = (action: PayloadAction<any>): string => {
    return (action.payload as CustomRejectedAction)?.message || UndefinedError
}