import { Route, Routes } from "react-router-dom"
import { routes } from './routes.tsx'


export const AppRouter = () => {
    return (
        <Routes>
            {routes.map(({ path, element }) =>
                <Route key={path} path={path} element={element}/>
            )}
        </Routes>
    )
}