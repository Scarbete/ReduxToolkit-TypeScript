import { BrowserRouter } from 'react-router-dom'
import { FC } from 'react'

import { Header } from './components/header/header.tsx'
import { Footer } from './components/footer/footer.tsx'
import { AppRouter } from './links/appRouter.tsx'


export const App: FC = () => {

    return (
        <BrowserRouter>
            <Header/>
            <AppRouter/>
            <Footer/>
        </BrowserRouter>
    )
}